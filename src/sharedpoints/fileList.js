var shareit = (function(module){
var _priv = module._priv = module._priv || {}

/**
 * Sharedpoint created by an Input tag
 */
_priv.FileList = function(fileList, db, filesManager)
{
  _priv.Sharedpoint.call(this, db, filesManager)

  this.name = fileList[0].webkitRelativePath.split('/')[0];
  this.type = 'FileList'
  this.size = 0

  this.fileList = function()
  {
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
        sharedpoint: this.name,
        path: file.webkitRelativePath.split('/').slice(1, -1).join('/'),
        name: file.name,

        lastModifiedDate: file.lastModifiedDate,
        file: file
      }

      files.push(fileentry)
    }

    files.sort(this.sort_pathName)

    return files
  }
}

return module
})(shareit || {})