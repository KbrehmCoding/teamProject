
function buildURL() {
  var queryURL = 'https://api.data.charitynavigator.org/v2/Organizations?';

  // default parameters on API URL
  var queryParameters = { 
    'app_id': '262a6a90',
    'app_key': 'f2c5607d357d16ed25d52dcea19d248f',
    'pageSize': '10',
    'rated': 'true',
  };
  // search parameter
  queryParameters.search = $('#search-input').val().trim();
  var stateSelection = $('#state').val();  
  if (stateSelection !== '') {
    queryParameters.state = stateSelection;
  }

  // return the completed URL to the function call
  return queryURL + $.param(queryParameters);
}

// function that clears search image and then prints results to list
function printResults(response) {
  console.log(response);
  // clear current results if any
  clear();
  // variable to hold the number of results the user requests
  var resultCount = $('#result-count').val();
  // loop through requests and add them to the screen
  for (let i = 0; i < resultCount; i++) {
    // variable to hold name of charity
    var newTitle = $('<h5>');
    newTitle
      .addClass('card-title')  //  bootstrap class
      .css('display', 'inline-block')  //  custom css
      .css('margin-right', '5px')  //  space this element away from the next
      .text(response[i].organization.charityName)  //  input name from object to text
    ;

    // create variable for star rating image
    var ratingImage = $('<img>');
    ratingImage
      .css('display', 'inline-block')  //  make sure this is on the same line as title
      .attr('src', response[i].currentRating.ratingImage.large)  //  set image src
    ;

    // variable to hold tagline
    var newTagline = $('<p>');
    newTagline
      .addClass('card-text')  //  bootstrap styling
      .css('text-decoration', 'underline')  //  underline the tagline for emphasis
      .text('Tagline: ' + response[i].tagLine)  //  input tagline from response
    ;

    // variable for mission statement
    var mission = $('<p>');
    mission
      .attr('id', 'mission' + i)  //  individual labels to grab later
      .addClass('card-text hidden')  //  hide by default
      .text(response[i].mission)  //  insert mission statement text
    ;

    // variable for more information button
    var moreButton = $('<a>');
    moreButton
      .addClass('btn btn-primary m-1 moreInfo')  //  bootstrap styling and moreInfo  for click listener
      .attr('href', '#')  //  dead link
      .attr('value', 'mission' + i)  //  value to match button to mission statement
      .text('More Information')  //  button text
    ;

    // variable for meetup button
    var meetupButton = $('<a>');
    meetupButton
      .addClass('btn btn-primary m-1 meetupInfo')  //  bootstrap styling and meetupInfo for click listener
      .attr('href', '#')  //  dead link
      .attr('data-title', response[i].organization.charityName)  //  data attribute to send to meetup function
      .text('Find Meetup Events')  //  button text
    ;

    // append all variables for screen display
    $('#charity-list').append(newTitle, ratingImage, newTagline, mission, moreButton, meetupButton)
    // add in horizontal rule after every charity section except the last
    if (i < resultCount-1) {
      $('#charity-list').append($('<hr>'));
    }
  }
}

// clears the list of charities on the screen
function clear() {
  $('#charity-list').empty();
}

// click function for MORE INFORMATION
$('#charity-display').on('click', '.moreInfo', function(event) {
  // prevent page refrehs
  event.preventDefault();
  //varible to hold the value attribute to match to mission statement to show or hide
  var clickedValue = event.currentTarget.attributes[2].value;
  // toggle hidden class to show or hide the mission statement information
  $('#' + clickedValue).toggleClass('hidden');
})

// click function for MEETUP INFORMATION
$('#charity-display').on('click', '.meetupInfo', function(event) {
  // prevent page refresh
  event.preventDefault();
  // variable to grab the data-title information to feed into the meetup.js function
  var charityName = event.currentTarget.attributes[2].value;
  // run meetup function
  meetupFind(charityName);
})

// click or submit of the search parameters
$('#run-search').on('click', function(e) {
  // prevent page refresh
  e.preventDefault();

  // run URL builder function and set to function scoped variable
  var searchURL = buildURL();

  // ajax call using searchURL
  $.ajax({
    url: searchURL,
    method: 'GET'
  }).then(printResults)  //  run print results function when response is received
});
