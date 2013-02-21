/**
 * 
 * @param {IDBDatabase} db ShareIt! database.
 */
function FilesManager(db, peersManager)
{
  EventTarget.call(this);

  var self = this;


  peersManager.addEventListener('channel', function(event)
  {
    var channel = event.channel

    Transport_Host_init(channel, db);
    Transport_Peer_init(channel, db, peersManager);

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
      db.files_add(fileentry, function()
      {
        self.transfer_end(fileentry);
      }, onerror);

      return;
    }

    // Calc number of necesary chunks to download
    // and add a bitmap to our file stub
    var chunks = fileentry.size / chunksize;
    if(chunks % 1 != 0)
       chunks = Math.floor(chunks) + 1;

    fileentry.bitmap = new Bitmap(chunks);

    // Insert new "file" inside IndexedDB
    db.files_add(fileentry, function()
    {
      var event = document.createEvent("Event");
          event.initEvent('transfer.begin',true,true);
          event.data = [fileentry]

      self.dispatchEvent(event);

      // Demand data from the begining of the file
      transfer_query(fileentry);
    }, onerror);
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
      db.files_put(fileentry, function()
      {
        self.transfer_update(fileentry, pending_chunks);

        transfer_query(fileentry);
      });
    }
    else
    {
      // There are no more chunks, set file as fully downloaded
      delete fileentry.bitmap;

      db.files_put(fileentry, function()
      {
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
    db.sharepoints_get(fileentry.sharedpoint, function(sharedpoint)
    {
      // Increase sharedpoint shared size
      sharedpoint.size += fileentry.file.size;

      db.sharepoints_put(sharedpoint, function()
      {
        var event = document.createEvent("Event");
            event.initEvent('sharedpoints.update',true,true);

        self.dispatchEvent(event);
      });
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
    db.sharepoints_get(fileentry.sharedpoint, function(sharedpoint)
    {
      // Increase sharedpoint shared size
      sharedpoint.size -= fileentry.file.size;

      db.sharepoints_put(sharedpoint, function()
      {
        var event = document.createEvent("Event");
            event.initEvent('sharedpoints.update',true,true);

        self.dispatchEvent(event);
      });
    });
  };


  this.files_downloading = function(onsuccess)
  {
    db.files_getAll(null, function(filelist)
    {
      var downloading = [];

      for(var i = 0, fileentry; fileentry = filelist[i]; i++)
        if(fileentry.bitmap)
          downloading.push(fileentry);

        // Update Downloading files list
        onsuccess(downloading);
    });
  };

  this.files_sharing = function(onsuccess)
  {
    db.files_getAll(null, function(filelist)
    {
      var sharing = []

      for(var i=0, fileentry; fileentry=filelist[i]; i++)
        if(!fileentry.bitmap)
          sharing.push(fileentry)

      // Update Sharing files list
      onsuccess(sharing)
    })
  }
}