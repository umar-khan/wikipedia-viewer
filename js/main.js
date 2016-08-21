$(document).ready(function () {
  
  var searchResults = "";
  var randomResults = "";
  var input = "";
  
  function search() {
    $.getJSON("http://en.wikipedia.org/w/api.php/w/api.php?action=query&format=json&list=search&srsearch=butterflies&callback=?", function (json) {
      searchResults = JSON.stringify(json);
      console.log(searchResults);
      $("#searchResults").html(searchResults);
    });
  }
  
  /*
  function random() {
    $.getJSON("", function (json) {
      randomResults = JSON.stringify(json);
      $("#randomResults").html(searchResults);
    });
  }
  */
  
  search();
});