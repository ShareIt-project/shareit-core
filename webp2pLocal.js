webp2p.Webp2pLocal = function()
{
  EventTarget.call(this);

  var self = this


  var peersManager = new PeersManager()

  // Init database
  DB_init(function(db)
  {
    var filesManager = new FilesManager(db, peersManager)

    // Init cache backup system
    var cacheBackup = new CacheBackup(db, filesManager)

    // Init sharedpoints manager
    var sharedpointsManager = new SharedpointsManager(db, filesManager)


    self.cacheBackup_export = function(onfinish, onprogress, onerror)
    {
      cacheBackup.export(onfinish, onprogress, onerror)
    }

    self.cacheBackup_import = function(blob, cb)
    {
      cacheBackup.import(blob, cb)
    }

    /**
     * Connects to another peer based on its UID. If we are already connected,
     * it does nothing.
     * @param {UUID} uid Identifier of the other peer to be connected.
     * @param {MessageChannel} incomingChannel Optional channel where to
     * @param {Function} cb Callback.
     * send the offer. If not defined send it to all connected peers.
     */
    self.connectTo = function(uid, incomingChannel, cb)
    {
      peersManager.connectTo(uid, incomingChannel, cb)
    }

    self.files_downloading = function(cb)
    {
      filesManager.files_downloading(cb)
    }

    self.files_sharing = function(cb)
    {
      filesManager.files_sharing(cb)
    }

    self.numPeers = function(cb)
    {
      cb(null, Object.keys(peersManager.getChannels()).length);
    }

    self.sharedpointsManager_addSharedpoint_Folder = function(files, cb)
    {
      sharedpointsManager.addSharedpoint_Folder(files, cb)
    }

    self.sharedpointsManager_getSharedpoints = function(cb)
    {
      sharedpointsManager.getSharedpoints(cb)
    }

    /**
     * Start the download of a file
     * @param {Fileentry} Fileentry of the file to be downloaded.
     */
    self.transfer_begin = function(fileentry)
    {
      filesManager.transfer_begin(fileentry)
    }


    function forwardEvent(event)
    {
      self.dispatchEvent(event);
    }

    peersManager.addEventListener('error.noPeers', forwardEvent);
    peersManager.addEventListener('uid', forwardEvent);

    filesManager.addEventListener('file.added',   forwardEvent);
    filesManager.addEventListener('file.deleted', forwardEvent);

    filesManager.addEventListener('sharedpoints.update', forwardEvent);

    filesManager.addEventListener('transfer.begin',  forwardEvent);
    filesManager.addEventListener('transfer.end',    forwardEvent);
    filesManager.addEventListener('transfer.update', forwardEvent);
  })
}