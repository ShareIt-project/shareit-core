var shareit = (function(module){
var _priv = module._priv = module._priv || {}


/**
 * Addapt a transport layer to be used as a peer
 * @param transport
 * @param {IDBdatabase} db ShareIt! database.
 * @param {FilesManager} filesManager {FilesManager} object.
 */
_priv.Transport_Peer_init = function(transport, db, filesManager)
{
//  /**
//   * Check if we already have the file and set it references to our copy
//   * @param {Fileentry} fileentry {Fileentry} to be checked.
//   * @param {Array} fileslist List of {Fileentry}s.
//   */
//  function check_ifOwned(fileentry, fileslist)
//  {
//    // We add here ad-hoc the channel of the peer where we got
//    // the file since we currently don't have support for hashes
//    // nor tracker systems
//    fileentry.channel = transport;
//
//    // Check if we have the file already, and if so set it our copy
//    // bitmap and blob reference
//    for(var j = 0, file_hosted; file_hosted = fileslist[j]; j++)
//      if(fileentry.hash == file_hosted.hash)
//      {
//        fileentry.bitmap = file_hosted.bitmap;
//        fileentry.blob = file_hosted.file || file_hosted.blob;
//
//        break;
//      }
//  }
//
//  // fileslist
//  var _fileslist = [];

  /**
   * Catch new sended data for the other peer fileslist
   */
  transport.addEventListener('fileslist.send', function(event)
  {
    var fileentries = event.data[0];

    // Update the fileslist for this peer
    db.files_getAll_byPeer(transport.uid, function(error, keys)
    {
      // Remove old peer fileslist
      for(var i = 0, key; key = keys[i]; i++)
        db.files_delete(key)

      // Set new fileslist for this peer
      for(var i = 0, fileentry; fileentry = fileentries[i]; i++)
      {
        fileentry.peer = transport.uid
        fileentry.sharedpoint = ""

        db.files_add(fileentry)
      }

      // [ToDo] Use parallize
      for(var i = 0, fileentry; fileentry = fileentries[i]; i++)
        if(!fileentry.bitmap)
          db.files_getAll_byHash(fileentry.hash,
          function(error, fileentries)
          {
            if(fileentries.length)
            {
              var duplicates = []

              for(var i=0, entry; entry=fileentries[i]; i++)
                if(fileentry.peer != entry.peer
                || fileentry.sharedpoint != entry.sharedpoint
                || fileentry.path != entry.path
                || fileentry.name != entry.name)
                {
                  var fullpath = ""

                  // Peer
                  if(entry.peer)
                    fullpath += '['+entry.peer+']'

                  // Sharedpoint
                  if(entry.sharedpoint)
                    fullpath += '/'+entry.sharedpoint

                  // Path
                  if(entry.path)
                  {
                    if(fullpath)
                       fullpath += '/'
                    fullpath += entry.path
                  }

                  // Name
                  if(fullpath)
                     fullpath += '/'
                  fullpath += entry.name

                  duplicates.push(fullpath)
                }

              if(duplicates.length)
                fileentry.duplicates = duplicates
            }
          })

      // Notify about fileslist update
      var event = document.createEvent("Event");
          event.initEvent('fileslist._updated',true,true);
          event.fileslist = fileentries

      transport.dispatchEvent(event);
    })
  });

  /**
   * Request the other peer fileslist
   */
  transport.fileslist_query = function(flags)
  {
    transport.emit('fileslist.query', flags);
  };

  /**
   * Request to the other peer don't send fileslist updates
   */
  transport.fileslist_disableUpdates = function()
  {
    transport.emit('fileslist.disableUpdates');
  };


  // fileslist updates
  /**
   * Catch when the other peer has added a new file
   */
  transport.addEventListener('fileslist.added', function(event)
  {
    var fileentry = event.data[0];
        fileentry.peer = transport.uid

    db.files_put(fileentry, function(error)
    {
      // Check if we have already the file from this peer in the index

      // Notify about fileslist update
      var event = document.createEvent("Event");
          event.initEvent('fileslist._updated',true,true);
          event.fileslist = _fileslist

      transport.dispatchEvent(event);
    })
  });

  /**
   * Catch when the other peer has deleted a file
   */
  transport.addEventListener('fileslist.deleted', function(event)
  {
    var fileentry = event.data[0];
        fileentry.peer = transport.uid

    // Remove the fileentry for the fileslist
    db.files_delete(fileentry, function(error)
    {
      // Notify about fileslist update
      var event = document.createEvent("Event");
          event.initEvent('fileslist._updated',true,true);
          event.fileslist = _fileslist

      transport.dispatchEvent(event);
    })
  });


  // transfer
  /**
   * Catch new sended data for a file
   */
  transport.addEventListener('transfer.send', function(event)
  {
    var hash  = event.data[0];
    var chunk = parseInt(event.data[1]);
    var data  = event.data[2];

    // Fix back data transmited as UTF-8 to binary
    var byteArray = new Uint8Array(data.length);
    for (var i = 0; i < data.length; i++)
      byteArray[i] = data.charCodeAt(i) & 0xff;

    data = byteArray;

    db.files_get_byHash(hash, function(error, fileentry)
    {
      if(error)
        console.error(error)

      else
        filesManager.updateFile(fileentry, chunk, data);
    });
  });

  /**
     * Request (more) data for a file
     * @param {Fileentry} Fileentry of the file to be requested.
     * @param {Number} chunk Chunk of the file to be requested.
     */
  transport.transfer_query = function(fileentry, chunk)
  {
    transport.emit('transfer.query', fileentry.hash, chunk);
  };
}

return module
})(shareit || {})