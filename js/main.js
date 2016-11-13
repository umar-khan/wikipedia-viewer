$(document).ready(function () {
  
  var searchResults = [];
  var random = "";
  var input = "";
  
  function search(query) {
    // Use Wikipedia API to return 10 search results based on input
    // Results are returned as an array
    $.getJSON("https://en.wikipedia.org/w/api.php?action=opensearch&format=json&callback=?&search=" + query, function (json) {
      
      // Store search results in searchResults array
      searchResults = json;
      console.log(query);
      
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
  
  // Trigger search function when search button is clicked
  $("#searchButton").on("click", function () {
    // Pass value of input textbox to search  function
    search($("#searchBox").val());
  });
  // Trigger search function if user presses ENTER in textbox
  $("#searchBox").keypress(function (event) {
    if (event.keyCode === 13) {
      $("#searchButton").click();
    }
  });
  
  // Trigger randomSearch function when random search button is clicked
  $("#randomSearchButton").on("click", randomSearch);
  
  
});


