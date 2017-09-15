const DOMNodeCollection = require("./dom_node_collection.js");

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

module.exports = $DJ;
