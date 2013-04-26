var shareit = (function(module){
var _priv = module._priv = module._priv || {}

/**
 * Sharedpoint created by an Input tag
 */
_priv.Folder = function(files, db, filesManager)
{
  function sort_pathName(a,b)
  {
    return (a.path - b.path) || (a.name - b.name)
  }

  files.sort(sort_pathName)

  this.name = files[0].webkitRelativePath.split('/')[0];
  this.type = 'folder'
  this.size = 0

  this.hash = function()
  {
    filesManager.hash(files, this.name);
  }

  this.refresh = function()
  {
    // Get all files currently indexed to delete removed old ones
    db.files_getAll_byPeer("", function(error, fileentries)
    {
      var entries = []

      // Get entries only for this sharedpoint
      for(var i=o, fileentry; fileentry=fileentries[i]; i++)
        if(fileentry.sharedpoint == this.name)
          entries.push(fileentry)

      // Sort the files by path and name
      entries.sort(sort_pathName)

      // Run over the old and new files looking for deleted and added ones
      var ai = bi= 0;
      while(ai < entries.length && bi < files.length)
      {
        var entry = entries[ai]
        var file  = files[bi]

        // Entry was removed
        if(entry < file)
        {
          db.files_delete(entry)
          filesManager._send_file_deleted(entry)

          ai++;
        }

        // File was added
        else if(entry > file)
        {
          filesManager.hash(file)

          bi++;
        }

        // Both entry and file are equal, check the modification date
        else
        {
          if(entry.modificationDate < file.modificationDate)
            filesManager.hash(file)

          ai++;
          bi++;
        }
      }
    })
  }
}

return module
})(shareit || {})