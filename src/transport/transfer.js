/**
 * Addapt a transport layer to be used as a host
 * @param transport
 * @param {IDBdatabase} db ShareIt! database.
 */
function Transport_Transfer_init(transport, db, filesManager)
{
  Transport_init(transport);

  /**
   * Catch request of file data
   */
  transport.addEventListener('transfer.query', function(event)
  {
    // [ToDo] check when fragment is not available and return error

    var hash = event.data[0];
    var chunk = event.data[1];

    var reader = new FileReader();
    reader.onerror = function(evt)
    {
      console.error('host.transfer_query('+hash+', '+chunk+") = '"+
                    evt.target.result+"'");
    };
    reader.onload = function(evt)
    {
      transport.emit('transfer.send', hash, chunk, evt.target.result);
    };

    var start = chunk * chunksize;
    var stop  = start + chunksize;

    function readSlice(blob)
    {
      var filesize = parseInt(blob.size);
      if(stop > filesize)
         stop = filesize;

      reader.readAsBinaryString(blob.slice(start, stop));
    }

    db.files_getAll_byHash(hash, function(error, fileentries)
    {
      if(error)
      {
        console.error(error)
        return
      }

      if(fileentries.length)
      {
        // Try to read from a file
        for(var i=0, fileentry; fileentry=fileentries[i]; i++)
          if(fileentry.file)
          {
            readSlice(fileentry.file)
            return
          }

        // Try to read from a blob
        // [ToDo] check when fragment is not available and return error
        for(var i=0, fileentry; fileentry=fileentries[i]; i++)
          if(fileentry.blob)
          {
            readSlice(fileentry.blob)
            return
          }
      }

      console.warn("File "+hash+" was not found to be readed")
    });
  });

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
    for(var i = 0; i < data.length; i++)
      byteArray[i] = data.charCodeAt(i) & 0xff;

    data = byteArray;

    db.files_getAll_byHash(hash, function(error, fileentries)
    {
      if(error)
        console.error(error)

      else if(fileentries.length)
      {
        for(var i=0, fileentry; fileentry=fileentries[i]; i++)
          if(fileentry.blob)
          {
            var event = document.createEvent("Event");
                event.initEvent('transfer._send',true,true);
                event.fileentry = fileentry
                event.chunk = chunk
                event.data = data

            transport.dispatchEvent(event);
            return
          }
      }

      else
        console.warn("We are not downloading file "+hash)
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


  transport.addEventListener('open', function(event)
  {
    console.log('Opened datachannel "' + transport.label + '"');

    transport.addEventListener('transfer._send', function(event)
    {
      var fileentry = event.fileentry
      var chunk     = event.chunk
      var data      = event.data

      filesManager.updateFile(fileentry, chunk, data);
    });
  })
}