var shareit = (function(module){
var _priv = module._priv = module._priv || {}

_priv.SharedpointsManager = function(db, filesManager)
{
  EventTarget.call(this);

  var self = this;

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

        filesManager.hash(files, sharedpoint_name);

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

  filesManager.addEventListener('file.added', function(event)
  {
    var fileentry = event.fileentry

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
  });

  filesManager.addEventListener('file.deleted', function(event)
  {
    var fileentry = event.fileentry

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
  });
}

return module
})(shareit || {})