class DOMNodeCollection {
  constructor(htmlArr){
    this.htmlArr = htmlArr;
  }

  html(str){
    if(str !== undefined){
      this.htmlArr.map(function(el){
        el.innerHtml = str;
        return el;
      });
    } else if (this.htmlArr.length > 0){
      return this.htmlArr[0].innerHtml;
    }
  }

  empty(){
    this.html("");
  }

  append(el){
    if (this.htmlArr.length === 0) return;

    if (typeof el === 'string'){
      this.htmlArr.forEach(item => item.innerHTML += el);
    } else if (el instanceof DOMNodeCollection) {
      this.htmlArr.appendChild(el);
    }
  }


  attr(str){
    return this.htmlArr[0].getAttribute(str);
  }

  addClass(newClass){
    this.htmlArr.map(function(el){
      el.classList.add(newClass);
    });
  }

  removeClass(rmClass){
    this.htmlArr.map(function(el){
      el.classList.remove(rmClass);
    });
  }

  children(){
    let allChildren = [];
    this.htmlArr.forEach(function(el){
      let childArr = Array.from(el.childNodes);
      allChildren = allChildren.concat(childArr);
    });
    return new DOMNodeCollection(allChildren);
  }



  parent(){
    let allParents = [];
    this.htmlARR.forEach(function(el){
      if(!allParents.includes(el.parentNode)){
        allParents.push(el.parentNode);
      }
    });
    return new DOMNodeCollection(allParents);
  }

  find(selector){
    let result = [];
    this.htmlArr.forEach((el) =>{
      let search = el.querySelectorAll(selector);
      if(search){
        // result = result.concat(Array.from(search));
        Array.from(search).forEach((el) => {
          if(!result.includes(el)) result.push(el);
        });
      }
    });
    return new DOMNodeCollection(result);
  }

  remove(){
    this.htmlArr.forEach(function(el){
      el.parentNode.removeChild(el);
    });
  }

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

}

module.exports = DOMNodeCollection;
