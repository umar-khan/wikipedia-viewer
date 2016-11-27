$(document).ready(function () {
  
  function search(query) {
    // Use Wikipedia API to return 10 search results based on input
    // Results are returned as an array
    $.getJSON("https://en.wikipedia.org/w/api.php?action=opensearch&format=json&callback=?&search=" + query, function (json) {
      
      var titles = [];
      var descriptions = [];
      var urls = [];
      
      // Store article Titles, Descriptions, and URLs, in arrays
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
    
    // Remove any visible result items
    $(".listItem").remove();
    
    //
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
  
  // Unfocus buttons after they are pressed
  $(".btn").mouseup(function() {
    $(this).blur();
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


