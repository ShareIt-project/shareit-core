var shareit = (function(module){
var _priv = module._priv = module._priv || {}

/**
 * 
 * @param {IDBDatabase} db ShareIt! database.
 */
_priv.FilesManager = function(db, peersManager)
{
  EventTarget.call(this);

  var self = this;


  /**
   * Get the channel of one of the peers that have the file from its hash.
   * Since the hash and the tracker system are currently not implemented we'll
   * get just the channel of the peer where we got the file that we added
   * ad-hoc before
   * @param {Fileentry} Fileentry of the file to be downloaded.
   * @return {RTCDataChannel} Channel where we can ask for data of the file.
   */
  function getChannel(fileentry)
  {
    return fileentry.channel;
  }

  /**
   * Request (more) data for a file
   * @param {Fileentry} Fileentry of the file to be requested.
   */
  function transfer_query(fileentry)
  {
    var channel = getChannel(fileentry);
    var chunk = fileentry.bitmap.getRandom(false);

    channel.transfer_query(fileentry, chunk);
  }


  peersManager.addEventListener('channel', function(event)
  {
    var channel = event.channel

    Transport_Host_init(channel, db);
    Transport_Peer_init(channel, db, self);

    self.addEventListener('file.added', function(event)
    {
      var fileentry = event.data[0];

      channel._send_file_added(fileentry);
    });
    self.addEventListener('file.deleted', function(event)
    {
      var fileentry = event.data[0];

      channel._send_file_deleted(fileentry);
    });
  })


  /**
   * Start the download of a file
   * @param {Fileentry} Fileentry of the file to be downloaded.
   */
  this.transfer_begin = function(fileentry)
  {
    function onerror(errorCode)
    {
      console.error("Transfer begin: '" + fileentry.name + "' is already in database.");
    }

    // Add a blob container to our file stub
    fileentry.blob = new Blob([''],
    {
      'type': fileentry.type
    });

    // File size is zero, generate the file instead of request it
    if(!fileentry.size)
    {
      // Insert new empty "file" inside IndexedDB
      db.files_add(fileentry, function(error, fileentry)
      {
        if(error)
          onerror(error)

        else
          self.transfer_end(fileentry);
      });

      return;
    }

    // Calc number of necesary chunks to download
    // and add a bitmap to our file stub
    var chunks = fileentry.size / chunksize;
    if(chunks % 1 != 0)
       chunks = Math.floor(chunks) + 1;

    fileentry.bitmap = new Bitmap(chunks);

    // Insert new "file" inside IndexedDB
    db.files_add(fileentry, function(error, fileentry)
    {
      if(error)
        onerror(error)

      else
      {
        var event = document.createEvent("Event");
            event.initEvent('transfer.begin',true,true);
            event.data = [fileentry]

        self.dispatchEvent(event);

        // Demand data from the begining of the file
        transfer_query(fileentry);
      }
    });
  };

  this.transfer_update = function(fileentry, pending_chunks)
  {
    var chunks = fileentry.size / chunksize;
    if(chunks % 1 != 0)
       chunks = Math.floor(chunks) + 1;

    // Notify about transfer update
    var event = document.createEvent("Event");
        event.initEvent('transfer.update',true,true);
        event.data = [fileentry, 1 - pending_chunks / chunks]

    this.dispatchEvent(event);
  };

  this.transfer_end = function(fileentry)
  {
    // Auto-save downloaded file
    savetodisk(fileentry.blob, fileentry.name);

    // Notify about transfer end
    var event = document.createEvent("Event");
        event.initEvent('transfer.end',true,true);
        event.data = [fileentry]

    self.dispatchEvent(event);

    console.log('Transfer of ' + fileentry.name + ' finished!');
  };


  /**
   * Update the data content of a {Fileentry}
   * @param {Fileentry} fileentry {Fileentry} to be updated.
   * @param {Number} chunk Chunk position to be updated.
   * @param data Data to be set.
   */
  this.updateFile = function(fileentry, chunk, data)
  {
    fileentry.bitmap.set(chunk, true);

    // Create new FileWriter
    var fw = new FileWriter(fileentry.blob);

    // Calc and set pos, and increase blob size if necessary
    var pos = chunk * chunksize;
    if(fw.length < pos)
       fw.truncate(pos);
    fw.seek(pos);

    // Write data to the blob
    var blob = fw.write(data);

    // This is not standard, but it's the only way to get out the
    // created blob
    if(blob != undefined)
      fileentry.blob = blob;

    // Check for pending chunks and require them or save the file
    var pending_chunks = fileentry.bitmap.indexes(false).length;

    if(pending_chunks)
    {
      // Demand more data from one of the pending chunks after update
      // the fileentry status on the database
      db.files_put(fileentry, function(error, fileentry)
      {
        if(error)
          onerror(error)

        else
        {
          self.transfer_update(fileentry, pending_chunks);

          transfer_query(fileentry);
        }
      });
    }
    else
    {
      // There are no more chunks, set file as fully downloaded
      delete fileentry.bitmap;

      db.files_put(fileentry, function(error, fileentry)
      {
        if(error)
          onerror(error)

        else
          self.transfer_end(fileentry);
      });
    }
  };

  /**
   * Notify to all peers that I have added a new file (both by the user or
   * downloaded)
   * @param {Fileentry} Fileentry of the file that have been added.
   */
  this._send_file_added = function(fileentry)
  {
    var event = document.createEvent("Event");
        event.initEvent('file.added',true,true);
        event.data = [fileentry]

    this.dispatchEvent(event);

    // Update fileentry sharedpoint size
    db.sharepoints_get(fileentry.sharedpoint, function(error, sharedpoint)
    {
      if(error)
        console.error(error)

      else
      {
        // Increase sharedpoint shared size
        sharedpoint.size += fileentry.file.size;

        db.sharepoints_put(sharedpoint, function(error, sharedpoint)
        {
          if(error)
            console.error(error)

          else
          {
            var event = document.createEvent("Event");
                event.initEvent('sharedpoints.update',true,true);

            self.dispatchEvent(event);
          }
        });
      }
    });
  };

  /**
   * Notify to all peers that I have deleted a file (so it's not accesible)
   * @param {Fileentry} Fileentry of the file that have been deleted.
   */
  this._send_file_deleted = function(fileentry)
  {
    var event = document.createEvent("Event");
        event.initEvent('file.deleted',true,true);
        event.data = [fileentry]

    this.dispatchEvent(event);

    // Update fileentry sharedpoint size
    db.sharepoints_get(fileentry.sharedpoint, function(error, sharedpoint)
    {
      if(error)
        console.error(error)

      else
      {
        // Increase sharedpoint shared size
        sharedpoint.size -= fileentry.file.size;

        db.sharepoints_put(sharedpoint, function(error, sharedpoint)
        {
          if(error)
            console.error(error)

          else
          {
            var event = document.createEvent("Event");
                event.initEvent('sharedpoints.update',true,true);

            self.dispatchEvent(event);
          }
        });
      }
    });
  };


  this.files_downloading = function(cb)
  {
    db.files_getAll(null, function(error, filelist)
    {
      if(error)
        console(error)

      else
      {
        var downloading = [];

        for(var i = 0, fileentry; fileentry = filelist[i]; i++)
          if(fileentry.bitmap)
            downloading.push(fileentry);

        // Update Downloading files list
        cb(null, downloading);
      }
    });
  };

  this.files_sharing = function(cb)
  {
    db.files_getAll(null, function(error, filelist)
    {
      if(error)
        console(error)

      else
      {
        var sharing = []

        for(var i=0, fileentry; fileentry=filelist[i]; i++)
          if(!fileentry.bitmap)
            sharing.push(fileentry)

        // Update Sharing files list
        cb(null, sharing)
      }
    })
  }
}

return module
})(shareit || {})