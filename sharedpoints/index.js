var shareit = (function(module){
var _priv = module._priv = module._priv || {}

_priv.SharedpointsManager = function(db, filesManager)
{
  // Init hasher
  var hasher = new _priv.Hasher(db, policy, this);
  hasher.onhashed = function(fileentry)
  {
    // Notify the other peers about the new hashed file
    filesManager._send_file_added(fileentry);
  };
  hasher.ondeleted = function(fileentry)
  {
    // Notify the other peers about the deleted file
    filesManager._send_file_deleted(fileentry);
  };

  this.getSharedpoints = function(callback)
  {
    db.sharepoints_getAll(null, callback);
  };

//  var sharedpoints = []
//
//  this.getSharedpoints(function(error, sharedpoints)
//  {
//    if(error)
//      console.error(error)
//
//    else
//      for(var i=0, sharedpoint; sharedpoint= sharedpoints[i]; i++)
//      {
//        switch(sharedpoint.type)
//        {
//          case 'dropbox':
//            break
//
//          case 'folder':
//            break
//        }
//      }
//    })
  this.addSharedpoint_Folder = function(files, cb)
  {
    var sharedpoint_name = files[0].webkitRelativePath.split('/')[0];

    this.getSharedpoints(function(error, sharedpoints)
    {
      if(error)
        console.error(error)

      else
      {
        for(var i = 0, sharedpoint; sharedpoint = sharedpoints[i]; i++)
          if(sharedpoint.name == name)
          {
            if(cb)
              cb(new Error('Sharedpoint already defined'));

            return;
          }

        var sharedpoint =
        {
          name: sharedpoint_name,
          type: 'folder',
          size: 0
        };

        db.sharepoints_put(sharedpoint);

        hasher.hash(files, sharedpoint_name);

        if(cb)
          cb();
      }
    });
  };

  this.delete = function(name, onsuccess)
  {
    db.sharepoints_delete(name, function(error, result)
    {
      if(error)
        console.error(error)

      else if(onsuccess)
        onsuccess(result)
    });
  };
}

return module
})(shareit || {})