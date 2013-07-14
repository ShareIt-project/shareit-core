// Based on code from https://github.com/jaredhanson/jsonrpc-postmessage

importScripts('../lib/webp2p.js',
              '../lib/shareit-core.js')


var methods = {}

function expose(name, service)
{
  if(!service && typeof name == 'object')
  {
    service = name;
    name = null;
  }

  if(typeof service == 'function')
    methods[name] = service;

  else if(typeof service == 'object')
  {
    var module = name ? name + '.' : '';
    for(var method in service)
      if(typeof service[method] === 'function')
        methods[module + method] = service[method];
  }
}

var core = new shareit.Local(null, function(error, core)
{
  if(error)
    alert(error)

  else
    expose(core)
})


self.onmessage = function(event)
{
  function result(err, res, cb)
  {
    if(typeof res === 'function')
    {
      cb  = res;
      res = null;
    }

    function result2(request)
    {
      request.id = requestID++;

      handlers[request.id] = cb

      setTimeout(function()
      {
        var handler = handlers[request.id];
        if(handler)
          handler.call(self, new Error('Timed Out'));

        delete handlers[request.id];
      }, timeout);
    }

    // requests without an id are notifications, to which responses are
    // supressed
    if(event.id !== null)
    {
      var response = {ack: event.id}

      if(err)
        response.error = err.message

      else
        response.result = res || null

      if(cb)
        result2(response)

      self.send(response)
    }

    else if(cb)
    {
      var request = {}

      result2(request)

      self.send(request)
    }
  }

  var method = methods[event.method];
  if(typeof method == 'function')
  {
    var params = event.args || [];
    // push result function as the last argument
    params.push(result);

    // invoke the method
    try
    {
      method.apply(shareit, params);
    }
    catch(err)
    {
      result(err);
    }
  }
  else
    result(new Error('Method Not Found'));
};