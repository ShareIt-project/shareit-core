/**
 * Polyfill to add full support for JavaScript objects with an IndexedDB
 * interface. This is primary purpose because a bug storing files on Chromium
 * implementation (http://code.google.com/p/chromium/issues/detail?id=108012).
 * The drawback is that since it's implemented using pure JavaScript objects,
 * well... the data persistence lacks about some functionality... :-P
 * @author piranna
 */
indexedDB = indexedDB || webkitIndexedDB || mozIndexedDB || msIndexedDB;


/**
 * Test if IndexedDB has support for Blob objects
 * @param {Function} callback Callback called when support have been checked
 */
function testIDBBlobSupport(callback)
{
  var dbname = "detect-blob-support";
  var idb = indexedDB;

  idb.deleteDatabase(dbname).onsuccess = function()
  {
    var request = idb.open(dbname, 1);

    request.onupgradeneeded = function()
    {
      request.result.createObjectStore("store");
    };
    request.onsuccess = function()
    {
      var db = request.result;

      try
      {
        db.transaction("store", "readwrite").objectStore("store").put(new Blob(), "key");
        callback(true);
      }
      catch(e)
      {
        callback(false);
      }
      finally
      {
        db.close();
        idb.deleteDatabase(dbname);
      }
    };
  };
}


/**
 * Overwrites and install an only-memory IndexedDB object with support for Blob
 */
function IdbJS_install()
{
  /**
   * @constructor
   */
  function IDBRequest(source)
  {
    this.target = {}
  }
  IDBRequest.prototype =
  {
    set onsuccess(func)
    {
      this._onsuccess = func
      var event = {target: this.target}
      func.call(this, event)
    }
  }


  /**
   * @constructor
   */
  function IDBOpenRequest()
  {
    IDBRequest.call(this)

//    this.prototype.__defineSetter__("onupgradeneeded", function(func)
//    {
//      var event = {target: this.target}
//      func.call(this, event)
//    })
  }
  IDBOpenRequest.prototype = new IDBRequest()


  /**
   * @constructor
   */
  function IDBCursor(source)
  {
    this._objects = []
    this._index = 0

    this.continue = function()
    {
      this._index += 1

      var event = {target: {}}
      if(this.value)
        event.target.result = this

      this._request._onsuccess(event)
    }
  }
  IDBCursor.prototype =
  {
    get value()
    {
      return this._objects[this._index]
    }
  }


  function IDBIndex(name, objectStore, keyPath, optionalParameters)
  {
    var records = {}

    this._clear = function()
    {
      records = {}
    }

    this._delete = function(key)
    {
      for(var index in records)
        if(records[index][keyPath] == key)
          delete records[index]
    }

    this._put = function(value, key)
    {
      var path = value[keyPath]

      if(optionalParameters.unique)
      {
        if(records[path])
          throw DOMException("DataError")

        records[path] = [key]
      }
      else
      {
        records[path] = records[path] || []

        records[path].push(key)
      }
    }

    this.get = function(key)
    {
      var key = records[key][0]

      var request = new IDBRequest()
          request.result = objectStore.get(key).result

      return request
    }

    this.__defineGetter__("keyPath", function()
    {
      return keyPath
    })

    this.__defineGetter__("multiEntry", function()
    {
      return Boolean(optionalParameters.multiEntry)
    })

    this.__defineGetter__("name", function()
    {
      return name
    })

    this.__defineGetter__("objectStore", function()
    {
      return objectStore
    })

    this.__defineGetter__("unique", function()
    {
      return Boolean(optionalParameters.unique)
    })
  }
  IDBIndex.prototype =
  {
    count: function(key)
    {
      var request = new IDBRequest()

      return request
    },

    getKey: function(key)
    {
      var request = new IDBRequest()

      return request
    },

    openCursor: function(range, direction)
    {
      direction = direction || "next"

      var cursor = new IDBCursor(this)
      var request = new IDBRequest()

      return request
    },

    openKeyCursor: function(range, direction)
    {
      direction = direction || "next"

      var request = new IDBRequest()

      return request
    }
  }


  /**
   * @constructor
   */
  function IDBObjectStore(name, keyPath, transaction, autoIncrement)
  {
    var objects = {}
    var indexes = {}

    this.add = function(value, key)
    {
      return this.put(value, key)
    }

    this.clear = function()
    {
      if(transaction.mode != "readonly")
        throw DOMException("ReadOnlyError");

      var request = new IDBRequest()

      objects = {}
      for(var name in indexes)
        indexes[name]._clear()

      return request
    }

    this.count = function(key)
    {
      var request = new IDBRequest(this)

//       = Object.keys(objects).length

      return request
    }

    this.createIndex = function(name, keyPath, optionalParameters)
    {
//      if(transaction.mode != "versionchange")
//        throw DOMException("InvalidStateError");

      if(indexes[name])
        throw DOMException("ConstraintError");

      optionalParameters = optionalParameters || {};

      if(keyPath instanceof Array)
      {
        if(optionalParameters.multiEntry)
          throw DOMException("InvalidAccessError")

        for(var i=0; i<keyPath.length; i++)
          keyPath[i] = keyPath[i].toString()
      }
      else
        keyPath = keyPath.toString()

      var index = new IDBIndex(name, this, keyPath, optionalParameters)
      indexes[name] = index

//      if()
//        transaction.abort()

      return index
    }

    this.delete = function(key)
    {
      delete objects[key]
      for(var name in indexes)
        indexes[name]._delete(key)

      return new IDBRequest()
    }

    this.deleteIndex = function(indexName)
    {
      if(transaction.mode != "versionchange")
        throw DOMException("InvalidStateError");

      delete indexes[indexName]

    }

    this.get = function(key)
    {
      var request = new IDBRequest()
          request.result = objects[key]
      return request
    }

    this.index = function(name)
    {
      return indexes[name]
    }

    this.openCursor = function(range)
    {
      var request = new IDBRequest()

      if(Object.keys(objects).length)
      {
        // Fill the cursor with the objectstore objects
        var cursor = new IDBCursor()
        for(var key in objects)
          cursor._objects.push(objects[key])

        // Link the request and the cursor between them
        request.target.result = cursor
        cursor._request = request
      }

      return request
    }

    this.put = function(value, key)
    {
//      if(transaction.mode == "readonly")
//        throw DOMException("ReadOnlyError");

      if(this.keyPath)
      {
        if(key)
          throw DOMException("DataError")

        function extract_key_from_value_using_keyPath(value, keyPath)
        {
          if(keyPath instanceof Array)
          {
            var result = []

            for(var i=0,item; item=keyPath[i]; i++)
            {
              var result2 = extract_key_from_value_using_keyPath(value, item)
              if(result2 == undefined)
                return

              result.push(result2)
            }

            return result
          }

          if(keyPath == "")
            return value

          var keyPath = keyPath.split(".")

          for(var i=0, identifier; identifier=keyPath[i]; i++)
          {
            var aux = value[identifier]
            if(aux == undefined)
              return
            value = aux
          }

          return value
        }

        key = extract_key_from_value_using_keyPath(value, this.keyPath)
      }

      if(!key)
        throw DOMException("DataError")

      for(var name in indexes)
        indexes[name]._put(value, key)
      objects[key] = value

      var request = new IDBRequest()
          request.result = value

      return request
    }

    this.__defineGetter__("indexNames", function()
    {
      return Object.keys(indexes);
    })
    this.__defineGetter__("keyPath", function()
    {
      return keyPath
    })

    this.__defineGetter__("name", function()
    {
      return name
    })

    this.__defineGetter__("transaction", function()
    {
      return transaction
    })

    this.__defineGetter__("autoIncrement", function()
    {
      return autoIncrement
    })
  }


  /**
   * @constructor
   */
  function IDBTransaction(db, mode)
  {
    this.abort = function()
    {
      
    }

    this.objectStore = function(name)
    {
      return db._stores[name]
    }

    this.__defineGetter__("db", function()
    {
      return db
    })

    this.__defineGetter__("error", function()
    {
      return error
    })

    this.__defineGetter__("mode", function()
    {
      return mode
    })
  }


  function IDBDatabase()
  {
    this._stores = {}

    this.createObjectStore = function(name, optionalParameters)
    {
      var keyPath = optionalParameters.keyPath
      var autoIncrement = optionalParameters.autoIncrement

      if(autoIncrement && (keyPath == "" || keyPath instanceof Array))
        throw InvalidAccessError

      if(keyPath instanceof Array)
        for(var i=0; i<keyPath.length; i++)
          keyPath[i] = keyPath[i].toString()
      else
        keyPath = keyPath.toString()

      var objectStore = new IDBObjectStore(name, keyPath)

      this._stores[name] = objectStore

      return objectStore
    }

    this.setVersion = function(version)
    {
      this.version = version

      return new IDBRequest()
    }

    this.transaction = function(storeNames, mode)
    {
      return new IDBTransaction(this, mode)
    }
  }


  indexedDB._dbs = {}
  indexedDB.open = function(name, version)
  {
    this._dbs[name] = this._dbs[name] || new IDBDatabase()

    var request = new IDBOpenRequest()
      request.result = this._dbs[name]

    return request
  }
}