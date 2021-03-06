function Local(handshake_servers, callback)
{
  var self = this


  function forwardEvent(event)
  {
    self.dispatchEvent(event);
  }


  var webp2p = new WebP2P(handshake_servers, ['fileslist','search','transfer'])

  // Init database
  DB_init(function(error, db)
  {
    if(error)
    {
      callback(error)
      return
    }

    // Init files manager
    var filesManager = new FilesManager(db, webp2p)

    // Init cache backup system
    var cacheBackup = new CacheBackup(db, filesManager)

    // Init sharedpoints manager
    var sharedpointsManager = new SharedpointsManager(db)


    self.cacheBackup_export = function(onfinish, onprogress, onerror)
    {
      cacheBackup.export(onfinish, onprogress, onerror)
    }

    self.cacheBackup_import = function(blob, callback)
    {
      cacheBackup.import(blob, callback)
    }

    /**
     * Connects to another peer based on its UID. If we are already connected,
     * it does nothing.
     * @param {UUID} uid Identifier of the other peer to be connected.
     * @param {MessageChannel} incomingChannel Optional channel where to
     * @param {Function} cb Callback.
     * send the offer. If not defined send it to all connected peers.
     */
    self.connectTo = function(uid, labels, incomingChannel, callback)
    {
      webp2p.connectTo(uid, labels, incomingChannel, callback)
    }

    self.files_downloading = function(callback)
    {
      filesManager.files_downloading(callback)
    }

    self.files_getAll_byHash = function(hash, callback)
    {
      db.files_getAll_byHash(hash, callback)
    }

    self.files_sharing = function(callback)
    {
      filesManager.files_sharing(callback)
    }

    self.fileslist_disableUpdates = function(uid, callback)
    {
      var peers = webp2p.getPeers()
      var peer = peers[uid]
      var channel = peer.channels['fileslist']

      channel.fileslist_disableUpdates()
    }

    self.fileslist_query = function(uid, flags, callback)
    {
      var peers = webp2p.getPeers()
      var peer = peers[uid]

      if(peer)
      {
        var channel = peer.channels['fileslist']

        if(channel)
           channel.fileslist_query(flags)

        else
          callback({msg: "No channel", uid: uid, channel: "shareit"})
      }
      else
        callback({msg: "No peer", uid: uid})
    }

    self.numPeers = function(callback)
    {
      callback(null, Object.keys(webp2p.getPeers()).length);
    }

    self.searchEngine_search = function(query, callback)
    {
      filesManager.search(query, callback)
    }

    self.sharedpointsManager_add = function(type, root, callback)
    {
      var sharedpoint

      switch(type)
      {
        case 'Entry':
          sharedpoint = new Entry(root, db, filesManager)
          break

        case 'FileList':
          sharedpoint = new FileList(root, db, filesManager)
          break

        default:
          callback("Unknown sharedpoint type '"+type+"'")
          return
      }

      sharedpointsManager.add(sharedpoint, callback)
    }

    self.sharedpointsManager_getSharedpoints = function(callback)
    {
      sharedpointsManager.getSharedpoints(callback)
    }

    /**
     * Start the download of a file
     * @param {Fileentry} Fileentry of the file to be downloaded.
     */
    self.transfer_begin = function(fileentry)
    {
      filesManager.transfer_begin(fileentry)
    }


    webp2p.addEventListener('connected', function(event)
    {
//      // Restart downloads
//      db.files_getAll(null, function(error, filelist)
//      {
//        if(error)
//          console.error(error)
//
//        else if(filelist.length)
//          policy(function()
//          {
//            for(var i=0, fileentry; fileentry=filelist[i]; i++)
//              if(fileentry.bitmap)
//                self.transfer_query(fileentry)
//          })
//      })

      self.dispatchEvent(event);
    });
    webp2p.addEventListener('disconnected', forwardEvent);
    webp2p.addEventListener('error',        forwardEvent);

    filesManager.addEventListener('file.added',   forwardEvent);
    filesManager.addEventListener('file.deleted', forwardEvent);

    filesManager.addEventListener('fileslist.updated', forwardEvent);

    filesManager.addEventListener('transfer.begin',  forwardEvent);
    filesManager.addEventListener('transfer.end',    forwardEvent);
    filesManager.addEventListener('transfer.update', forwardEvent);

    filesManager.addEventListener('sharedpoints.update', forwardEvent);

    callback(null, self)
  })
}
Local.prototype = new EventTarget()

var shareit = shareit || {};
    shareit.Local = Local;

exports.shareit = shareit;