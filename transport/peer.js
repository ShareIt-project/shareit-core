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
            filesManager.updateFile(fileentry, chunk, data);
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
}

return module
})(shareit || {})