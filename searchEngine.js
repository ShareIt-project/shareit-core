var shareit = (function(module){
var _priv = module._priv = module._priv || {}

_priv.SearchEngine = function(db, filesManager)
{
  var self = this

  // Init the search index
  var searchIndex = lunr(function()
  {
    this.field('sharedpoint')
    this.field('path', {boost: 10})
    this.field('name', {boost: 100})
  })

  // Add all files on IndexedDB to the index
  db.files_getAll(null, function(error, fileentries)
  {
    if(error)
      console.error("Error loading files from IndexedDB, search index couldn't be initialized")

    else
      for(var i=0, fileentry; fileentry=fileentries[i]; i++)
        self.add(fileentry)
  })

  this.add = function(fileentry)
  {
    var id = JSON.stringify([fileentry.peer, fileentry.sharedpoint,
                             fileentry.path, fileentry.name])

    searchIndex.add({id:          id,
                     sharedpoint: fileentry.sharedpoint,
                     path:        fileentry.path,
                     name:        fileentry.name})
  }

  this.remove = function(fileentry)
  {
    var id = JSON.stringify([fileentry.peer, fileentry.sharedpoint,
                             fileentry.path, fileentry.name])

    searchIndex.remove({id: id})
  }

  this.search = function(query, callback)
  {
    var results = searchIndex.search(query)
    var index = 0

    function data()
    {
      var result = results[index]

      if(result)
        db.files_get(JSON.parse(result.ref), function(error, fileentry)
        {
          if(error)
            results.splice(index, 1)

          else
          {
            fileentry.score = result.score
            results[index] = fileentry
            index++
          }

          data()
        })

      else
      {
        // Sort the results on score descending relevance
        results.sort(function(a,b)
        {
          return b.score - a.score
        })

        callback(null, results)
      }
    }

    data()
  }

  filesManager.addEventListener('file.added', function(event)
  {
    var fileentry = event.fileentry

    self.add(fileentry)
  })

  filesManager.addEventListener('file.deleted', function(event)
  {
    var fileentry = event.fileentry

    self.remove(fileentry)
  })
}

return module
})(shareit || {})