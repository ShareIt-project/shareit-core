/**
 * Init a channel as an event-based transport layer
 * @param transport
 */
function Transport_init(transport)
{
  /**
   *  Compose and send message
   */
  transport.emit = function()
  {
    var args = Array.prototype.slice.call(arguments, 0);

    transport.send(JSON.stringify(args))
  };

  /**
   *  Message received
   */
  transport.onmessage = function(message)
  {
    message = JSON.parse(message.data);

    var event = document.createEvent("Event");
        event.initEvent(message[0],true,true);
        event.data = message.slice(1)

    this.dispatchEvent(event);
  };
}
Transport_init.prototype = new EventTarget();