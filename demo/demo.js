const $DJ = require("../lib/main.js");

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
