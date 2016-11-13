$(document).ready(function () {
  
  var searchResults = [];
  var random;
  var input = "";
  
  function search() {
    // Use Wikipedia API to return 10 search results.
    // Results are returned as an array
    $.getJSON("https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=game&callback=?", function (json) {
      
      // Store search results in searchResults array
      searchResults = json;
      
      // Call function to show results
      showResults();
      
    });
  }
  
  
  function randomSearch() {
    // Uses Wikipedia API to return a random article
    // Results are returned as a JSON object
    $.getJSON("https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts%7Cinfo&generator=random&exchars=100&explaintext=1&inprop=url&grnnamespace=0&callback=?", function (json) {
      
      random = JSON.stringify(json);
      
      // Call function to show results
      showResults();
      
    });
  }
  
  function showResults() {
    
    $("#searchResults").html(searchResults);
    $("#randomResults").html(random);
    
  }
  
  
  search();
  randomSearch();
});


