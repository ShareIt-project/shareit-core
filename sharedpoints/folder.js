var shareit = (function(module){
var _priv = module._priv = module._priv || {}

/**
 * Sharedpoint created by an Input tag
 */
_priv.Folder = function(files, filesManager)
{
  this.name = files[0].webkitRelativePath.split('/')[0];
  this.type = 'folder'
  this.size = 0

  this.hash = function()
  {
    filesManager.hash(files, this.name);
  }
}

return module
})(shareit || {})