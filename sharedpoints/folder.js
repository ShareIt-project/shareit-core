var shareit = (function(module){
var _priv = module._priv = module._priv || {}

/**
 * Sharedpoint created by an Input tag
 */
_priv.Folder = function(fileList, db, filesManager)
{
  this.name = fileList[0].webkitRelativePath.split('/')[0];
  this.type = 'folder'
  this.size = 0

  this.hash = function()
  {
    console.info("Hashing sharedpoint '"+this.name+"'...")

    var self = this

    // Get all files currently indexed to delete removed old ones
    db.files_getAll_byPeer("", function(error, fileentries)
    {
      function sort_pathName(a,b)
      {
        return a.path.localeCompare(b.path) || a.name.localeCompare(b.name)
      }

      // Get entries only for this sharedpoint
      var entries = []

      for(var i=0, fileentry; fileentry=fileentries[i]; i++)
        if(fileentry.sharedpoint == self.name)
          entries.push(fileentry)

      entries.sort(sort_pathName)

      // Get the file entries from the FileList
      var files = []

      for(var i=0, file; file=fileList[i]; i++)
      {
        // Remove invalid entries
        if(file.name == '.')
          continue

        // Generate the fileentry
        var fileentry =
        {
          sharedpoint: self.name,
          path: file.webkitRelativePath.split('/').slice(1, -1).join('/'),
          name: file.name,

          lastModifiedDate: file.lastModifiedDate,
          file: file
        }

        files.push(fileentry)
      }

      files.sort(sort_pathName)

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
}

return module
})(shareit || {})