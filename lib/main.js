const DOMNodeCollection = require("./dom_node_collection.js");

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
    let val = $DJ("button.counterButton").attr("value");
    val = $DJ("button.counterButton").attr("value", parseInt(val) + 1);
    $DJ(".numberList").append(`<li class="numberItem">${val}</li>`);
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
  $DJ(".giphyList").append(`<li class="giphyItem"><img src=${url}></li>`);
};

removeElements = () => {
  $DJ(".giphyButton").off('click');
};

addElements = () => {
  $DJ(".giphyButton").on('click', fetchDog);
};
