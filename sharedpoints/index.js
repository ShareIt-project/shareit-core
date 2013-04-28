var shareit = (function(module){
var _priv = module._priv = module._priv || {}

_priv.Sharedpoint = function(db, filesManager)
{
  var self = this

  this.sort_pathName = function(a,b)
  {
    return a.path.localeCompare(b.path) || a.name.localeCompare(b.name)
  }

  this.hash = function()
  {
//    console.info("Hashing sharedpoint '"+this.name+"'...")

    var self = this

    // Get all files currently indexed to delete removed old ones
    db.files_getAll_byPeer("", function(error, fileentries)
    {
      // Get entries only for this sharedpoint
      var entries = []

      for(var i=0, fileentry; fileentry=fileentries[i]; i++)
        if(fileentry.sharedpoint == self.name)
          entries.push(fileentry)

      entries.sort(self.sort_pathName)

      // Get the file entries from the FileList
      var files = self.fileList()

      // Run over the old and new files looking for deleted and added ones
      var ai = bi= 0;
      while(ai < entries.length || bi < files.length)
      {
        var entry = entries[ai]
        var file  = files[bi]

        // Entry was removed
        if(entry < file || !file)
        {
          filesManager.delete(entry)

          ai++;
        }

        // File was added
        else if(entry > file || !entry)
        {
          filesManager.add(file)

          bi++;
        }

        // Both entry and file are equal, check the modification date
        else
        {
          // [Hack] When (re)moving the file from its original place, Chrome
          // show it with size = 0 and lastModifiedDate = null instead of
          // raising a NotFoundError error
          if(file.lastModifiedDate == null)
            filesManager.delete(entry)

          else if(entry.lastModifiedDate < file.lastModifiedDate)
            filesManager.add(file)

          ai++;
          bi++;
        }
      }

      setTimeout(function()
      {
        self.hash()
      },
      5*1000)
//      1*60*1000)
    })
  }

  filesManager.addEventListener('file.added', function(event)
  {
    var fileentry = event.fileentry

    if(fileentry.sharedpoint == self.name)
    {
      // Increase sharedpoint shared size
      self.size += fileentry.file.size;
  
      db.sharepoints_put(self, function(error, sharedpoint)
      {
        if(error)
          console.error(error)
  
        else
        {
          var event = document.createEvent("Event");
              event.initEvent('sharedpoints.update',true,true);
  
          filesManager.dispatchEvent(event);
        }
      });
    }
  });

  filesManager.addEventListener('file.deleted', function(event)
  {
    var fileentry = event.fileentry

    if(fileentry.sharedpoint == self.name)
    {
      // Increase sharedpoint shared size
      self.size -= fileentry.file.size;

      db.sharepoints_put(self, function(error, sharedpoint)
      {
        if(error)
          console.error(error)

        else
        {
          var event = document.createEvent("Event");
              event.initEvent('sharedpoints.update',true,true);

          filesManager.dispatchEvent(event);
        }
      });
    }
  });
}


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
//          case 'FileList':
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