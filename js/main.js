$(document).ready(function () {
  
  function search(query) {
    // Takes text in textbox and queries Wikipedia API for 10 search results
    // Results are returned as an array
    // Format of results = [Query, [Titles], [Descriptions], [URLs]]
    $.getJSON("https://en.wikipedia.org/w/api.php?action=opensearch&format=json&callback=?&search=" + query, function (json) {
      
      var titles = [];
      var descriptions = [];
      var urls = [];
      
      // Store all article Titles, Descriptions, and URLs, in arrays
      titles = json[1];
      descriptions = json[2];
      urls = json[3];
      
      // Build output array of results
      output = [titles, descriptions, urls];

      // Call function to show results
      showResults(output);
      
    });
  }
  
  
  function randomSearch() {
    // Uses Wikipedia API to return a random article
    // Results are returned as a JSON object
    $.getJSON("https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts%7Cinfo&generator=random&redirects=1&exsentences=2&explaintext=1&inprop=url&grnnamespace=0&callback=?", function (json) {
      
      var title = [];
      var description = [];
      var url = [];
      
      // The API seems to return a Javascript Object instead of JSON
      // We have to find the dynamically generated page ID in the path
      var pageID = Object.keys(json["query"]["pages"])[0];
      
      // Store the random article Title, Description, and URL, in arrays
      title.push(json["query"]["pages"][pageID]["title"]);
      description.push(json["query"]["pages"][pageID]["extract"]);
      url.push(json["query"]["pages"][pageID]["fullurl"]);
      
      // Build output array of results
      var output = [title, description, url];

      // Call function to show results
      showResults(output);
      
    });
  }
  
  function showResults(resultsArray) {
    // Takes input array and displays it on page using hidden template
    
    // Remove any visible results from previous query
    $(".listItem").remove();
    
    // Creates and displays list item for each item in input array
    for (var i = 0; i < resultsArray[0].length; i++) {
      var listItem = $(".template").clone();
      listItem.removeClass("template");
      listItem.addClass("listItem");
      
      // Set Title, Desctiption, and URL
      listItem.find("h4").text(resultsArray[0][i]);
      listItem.find("p").text(resultsArray[1][i]);
      listItem.attr("href", resultsArray[2][i]);
      
      // Add new list item to DOM
      $("#results").append(listItem);
    }
    
  }
  
  // Place cursor in search box on page load
  $("#searchBox").focus();
  
  // Unfocus buttons after they are clicked
  $(".btn").mouseup(function() {
    $(this).blur();
  });
  
  // Initialize all tooltips on website
  $(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });
  
  // Trigger search function when search button is clicked
  $("#searchButton").on("click", function () {
    // Pass value of input textbox to search  function
    search($("#searchBox").val());
  });
  // Trigger search function by imitating button click if user presses ENTER in textbox
  $("#searchBox").keypress(function (event) {
    if (event.keyCode === 13) {
      $(this).blur();
      $("#searchButton").click();
    }
  });
  
  // Trigger randomSearch function when random search button is clicked
  $("#randomSearchButton").on("click", randomSearch);
  
});


