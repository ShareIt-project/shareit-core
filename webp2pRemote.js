// Based on code from https://github.com/jaredhanson/jsonrpc-postmessage

webp2p.Webp2pRemote = function(channel)
{
  EventTarget.call(this);

  var self = this

  var timeout = 5000
  var handlers = {}
  var requestID = 1


  channel.onmessage = function(event)
  {
    var id = event.id
    if(id === null || id === undefined) return

    var handler = handlers[id];
    if(handler)
      handler.call(self, event.error, event.result);

    delete handlers[id];
  }


  function call(method)
  {
    var args = Array.prototype.slice.call(arguments, 1)
    var sb = (args.length && typeof args[args.length - 1] == 'function') ? args.pop() : null;

    var request =
    {
      id: requestID++,
      method: method,
      args: args
    }

    handlers[request.id] = cb

    setTimeout(function()
    {
      var handler = handlers[request.id];
      if(handler)
        handler.call(self, new Error('Timed Out'));

      delete handlers[request.id];
    }, timeout);

    channel.send(request);
  }


  this.cacheBackup_export = function(onfinish, onprogress, onerror)
  {
  }

  this.cacheBackup_import = function(blob, cb)
  {
    call('cacheBackup_import', blob, cb)
  }

  /**
   * Connects to another peer based on its UID. If we are already connected,
   * it does nothing.
   * @param {UUID} uid Identifier of the other peer to be connected.
   * @param {MessageChannel} incomingChannel Optional channel where to
     * @param {Function} cb Callback.
   * send the offer. If not defined send it to all connected peers.
   */
  this.connectTo = function(uid, incomingChannel, cb)
  {
    call('connectTo', uid, incomingChannel, cb)
  }

  this.files_downloading = function(cb)
  {
    call('files_downloading', incomingChannel, cb)
  }

  this.files_sharing = function(cb)
  {
    call('files_sharing', cb)
  }

  this.numPeers = function(cb)
  {
    call('numPeers', cb)
  }

  this.sharedpointsManager_addSharedpoint_Folder = function(files, cb)
  {
  }

  this.sharedpointsManager_getSharedpoints = function(onsuccess)
  {
  }

  /**
   * Start the download of a file
   * @param {Fileentry} Fileentry of the file to be downloaded.
   */
  this.transfer_begin = function(fileentry)
  {
    call('transfer_begin', fileentry)
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

  filesManager.addEventListener('transfer.begin', forwardEvent);
  filesManager.addEventListener('transfer.end', forwardEvent);
  filesManager.addEventListener('transfer.update', forwardEvent);
}