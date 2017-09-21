# DOMJuan

### DOMJuan is a JavaScript DOM interactive library inspired by jQuery. DOMJuan enables event handling, AJAX requests, and DOM manipulation.

[Demo](http://benbaron.info/DOMJuan)

### 'on' and 'off'
Adds and removes event listeners to elements using 'on' and 'off' making use of four helper methods to keep methods DRY.

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
  ### Examples:

```javascript
  $DJ(".counterButton").on("click", () => {
    let val = $DJ("button.counterButton").attr("value");
    val = $DJ("button.counterButton").attr("value", parseInt(val) + 1);
    $DJ(".numberList").append(`<li class="numberItem">${val}</li>`);
  });

  $DJ(".blueButton").on("click", () => {
    $DJ("body").removeClass("lightgreen");
    $DJ("body").addClass("lightblue");
  });
```

The window.$DJ provides the core functionality for DOMJuan. This function behaves differently depending upon the datatype passed in as an argument. If the argument is an HTMLElement, it will convert it to a DOMNodeCollection. For a string argument, it will query the document for all the elements of the same name and return a DOMNodeCollection of the elements. Functions that are passed in will be executed immediately if the document has loaded, otherwise they are placed in queue, funcArr, and executed once the document has finished loading.

```javascript
  const funcArr = [];

  window.$DJ = function(ele){
    if (ele instanceof HTMLElement){
      ele = Array.from(ele);
      let domEl = new DOMNodeCollection(ele);
      return domEl;

    } else if (typeof ele === 'string'){
      let eles = document.querySelectorAll(ele);
      eles = Array.from(eles);
      let domEl = new DOMNodeCollection(eles);
      return domEl;

    } else if (typeof ele === 'function'){
        if (document.readyState === "complete"){
          ele();
        } else {
        funcArr.push(ele);
        }
      }
  };

  document.addEventListener("DOMContentLoaded", function(){
    funcArr.forEach((fn) => fn());
  });
```
### '$DJ.ajax'
This creates requests for and to update data on servers. This method provides default values in an options hash.

```javascript

$DJ.ajax = (options) => {

  const defaultOptions = {
    method: "",
    url: "",
    data: {},
    contentType: "application/x-www-form-urlencoded; charset=utf-8",
    success: () => {},
    error: () => {},
  };
  let mergedOptions = $DJ.extend(defaultOptions, options);

   const xhr = new XMLHttpRequest();
   xhr.open(mergedOptions.method, mergedOptions.url);
   xhr.onload = function () {
     if (xhr.status === 200) {
       mergedOptions.success(JSON.parse(xhr.response));
     } else {
       mergedOptions.error(JSON.parse(xhr.response));
     }
   };
   xhr.send(mergedOptions.data);
 };
 ```
  ### Example $DJ.ajax:

```javascript
  fetchDog = () => {
    $DJ.ajax({
      method: "GET",
      url: "http://api.giphy.com/v1/gifs/search?q=dogs&api_key=598f7eb547fd42a38df8d56fc9934a64",
      success(data){ showDog(data);},
      error: () => alert("Error in fetching dog. Sorry."),
  });
  };

  showDog = (data) => {
    let num = Math.round(Math.random() * 25);
    let url = data.data[num].images.fixed_width.url;
    $DJ(".giphyList").append(`<li class="giphyItem"><img src=${url}></li>`);
  };
 ```
