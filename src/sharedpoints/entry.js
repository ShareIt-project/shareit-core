var shareit = (function(module){
var _priv = module._priv = module._priv || {}

/**
 * Sharedpoint created by a Filesystem entry (for example Drag&Drop)
 */
_priv.Entry = function(entry, db, filesManager)
{
  _priv.Sharedpoint.call(this, db, filesManager)

  this.name = entry.name;
  this.type = 'Entry'
  this.size = 0

  var self = this

  this.fileList = function(cb)
  {
    // Get the file entries from the FileList
    var files = []

    function readDirectory(entry, cb)
    {
      var dirReader = entry.createReader();
      var entries = []

      function readEntries()
      {
        dirReader.readEntries(function(results)
        {
          if(results.length)
          {
            entries = entries.concat(toArray(results));
            readEntries();
          }
          else
            cb(entries);
        },
        function(error)
        {
          console.error("readEntries error: "+error)
        });
      }
    }

    function addDirectory(entry, cb)
    {
      readDirectory(entry, function(results)
      {
        for(var i=0, result; result=results[i]; i++)
        {
          // File
          if(result.isFile)
            result.file(function(file)
            {
              // Generate the fileentry
              var fileentry =
              {
                sharedpoint: self.name,
                path: file.webkitRelativePath.split('/').slice(1, -1).join('/'),
                name: file.name,

                lastModifiedDate: file.lastModifiedDate,
                file: file
              }

              files.push(fileentry);
            })

          // Directory
          else if(result.isDirectory)
            addDirectory(result)

          // Unknown
          else
            console.warn("Unknown entry type for "+result.fullPath)
        }

        if(cb)
          cb(files)
      })
    }

    addDirectory(entry, function(files)
    {
      files.sort(self.sort_pathName)

      cb(files)
    })
  }
}

return module
})(shareit || {})