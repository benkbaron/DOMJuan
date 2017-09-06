/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1);

const funcArr = [];

window.$DJ = function(ele){
  if (ele instanceof HTMLElement){
    ele = Array.from(ele);
    let domEl = new DOMNodeCollection(ele);
    domEl.on("click", alert("Alert") );
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

$DJ.extend = function(mainObject, ...objs){
  return Object.assign(mainObject, ...objs);
};



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


let num = 1;

$DJ(() => {
  $DJ(".blueButton").on("click", () => {
    $DJ("body").removeClass("lightgreen");
    $DJ("body").addClass("lightblue");
  });

  $DJ(".greenButton").on("click", () => {
    $DJ("body").removeClass("lightblue");
    $DJ("body").addClass("lightgreen");
  });

  $DJ(".sayHiButton").on("click", () => alert("Why hello!"));

  $DJ(".counterButton").on("click", () => {
    $DJ(".numberList").append(`<li>${++num}</li>`);
  });

  $DJ(".giphyButton").on("click", fetchDog);

  $DJ(".remove-events").on("click", removeElements);
  $DJ(".add-events").on("click", addElements);
});

// Api Key:
// 598f7eb547fd42a38df8d56fc9934a64

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
  $DJ(".giphyList").append(`<li><img src=${url}></li>`);
};

removeElements = () => {
  $DJ(".giphyButton").off('click');
};

addElements = () => {
  $DJ(".giphyButton").on('click', fetchDog);
};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

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


/***/ })
/******/ ]);