# DOMJuan

## DOMJuan is a JavaScript DOM interaction library inspired by jQuery.

### 'On' and 'Off'
Adding and removing event listeners using 'on' and 'off' make use of four helper methods to keep methods DRY.

```javascript
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
  ```


  ### 'attr', 'addClass', 'removeClass'
  'attr' accepts a string and an optional value as arguments and returns either the innerHTML value of the DOM Node or updates the innerHTML value if a value argument is provided.

  'addClass' and 'removeClass' adds or removes the provided newClass name to the DOM Node.

  ```javascript
  attr(str, value){
    if (value) {
      this.htmlArr[0].setAttribute(str, value);
    }
    return this.htmlArr[0].getAttribute(str);
  }

  addClass(newClass){
    this.each(function(el){
      el.classList.add(newClass);
    });
  }

  removeClass(rmClass){
    this.each(function(el){
      el.classList.remove(rmClass);
    });
  }
    ```
