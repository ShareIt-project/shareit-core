/**
 * Sharedpoint created by an Input tag
 */
function FileList(fileList, db, filesManager)
{
  Sharedpoint.call(this, db, filesManager)

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