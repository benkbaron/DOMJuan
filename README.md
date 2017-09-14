# DOMJuan

## DOMJuan is a JavaScript DOM interaction library inspired by jQuery.

Adding and removing event listeners using 'on' and 'off' make use of four helper methods to keep methods DRY.

  on(eventName, cb){
    this.htmlArr.forEach(function(el) {
      DOMNodeCollection.addEvent(el, eventName, cb);
      el.addEventListener(eventName, cb);
    });
  }

  off(eventName){
    this.htmlArr.forEach(function(el) {
      DOMNodeCollection.getCallBacks(el, eventName).forEach((cb) => {
          el.removeEventListener(eventName, cb);
        });
        DOMNodeCollection.resetEvents(el, eventName);
    });
  }

  static addEvent(el, eventName, cb) {
    DOMNodeCollection.getCallBacks(el, eventName).push(cb);
  }

  static getCallBacks(el, eventName) {
    let events = DOMNodeCollection.getEvents(el);

    if (events[eventName] === undefined) {
      events[eventName] = [];
    }

    return events[eventName];
  }

  static getEvents(el) {
    if (el.domJuanEvents === undefined) {
      el.domJuanEvents = {};
    }
    return el.domJuanEvents;
  }

  static resetEvents(el, eventName) {
    DOMNodeCollection.getEvents(el)[eventName] = [];
  }
