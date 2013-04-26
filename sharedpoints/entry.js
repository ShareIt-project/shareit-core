var shareit = (function(module){
var _priv = module._priv = module._priv || {}

/**
 * Sharedpoint created by a Filesystem entry (for example Drag&Drop)
 */
_priv.Entry = function(entry, db, filesManager)
{
  this.name = entry.name;
  this.type = 'entry'
  this.size = 0

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
          cb(entries.sort());
      },
      function(error)
      {
        console.error("readEntries error: "+error)
      });
    }
  }

  function addDirectory(entry, sharedpoint_name)
  {
    readDirectory(entry, function(results)
    {
      for(var i=0, result; result=results[i]; i++)
      {
        // File
        if(result.isFile)
          result.file(function(file)
          {
            filesManager.hash(file, sharedpoint_name);
          })

        // Directory
        else if(result.isDirectory)
          addDirectory(result, sharedpoint_name)

        // Unknown
        else
          console.warn("Unknown entry type for "+result.fullPath)
      }
    })
  }

  this.hash = function()
  {
    addDirectory(entry, sharedpoint_name, cb)
  }
}

return module
})(shareit || {})