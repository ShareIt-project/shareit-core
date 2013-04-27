var shareit = (function(module){
var _priv = module._priv = module._priv || {}

_priv.SharedpointsManager = function(db)
{
  var self = this;

  this.getSharedpoints = function(callback)
  {
    db.sharepoints_getAll(null, callback);
  };

//  var sharedpoints = []
//
//  db.sharepoints_getAll(null, function(error, sharedpoints)
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

  this.add = function(sharedpoint, cb)
  {
    db.sharepoints_getAll(null, function(error, sharedpoints)
    {
      if(error)
      {
        console.error(error)

        if(cb)
          cb(new Error("Error getting sharedpoints"));
      }

      else
      {
        // Check if we have already this sharedpoint (one with this name)
        for(var i=0, sp; sp=sharedpoints[i]; i++)
          if(sp.name == sharedpoint.name)
          {
            if(cb)
              cb(new Error('Sharedpoint '+sharedpoint.name+' already defined'));

            return;
          }

        // Sharedpoint is new, add it to database and start hashing its files
        db.sharepoints_put(sharedpoint);
        sharedpoint.hash();

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