
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

function printResults(response) {
  console.log(response);
  // clear current results if any
  clear();
  var resultCount = $('#result-count').val();
  for (let i = 0; i < resultCount; i++) {
    var newTitle = $('<h5>');
    newTitle.addClass('card-title')
      .css('display', 'inline-block')
      .css('margin-right', '5px')
      .text(response[i].organization.charityName)
    ;

    var ratingImage = $('<img>');
    ratingImage
      .css('display', 'inline-block')
      .css('text-decoration', 'none')
      .attr('src', response[i].currentRating.ratingImage.large)
    ;

    var newTagline = $('<p>');
    newTagline
      .addClass('card-text')
      .css('text-decoration', 'underline')
      .text('Tagline: ' + response[i].tagLine)
    ;

    var mission = $('<p>');
    mission
      .attr('id', 'mission' + i)
      .addClass('card-text hidden')
      .text(response[i].mission)
    ;

    var moreButton = $('<a>');
    moreButton
      .addClass('btn btn-primary m-1 moreInfo')
      .attr('href', '#')
      .attr('value', 'mission' + i)
      .text('More Information')
    ;

    var meetupButton = $('<a>');
    meetupButton
      .addClass('btn btn-primary m-1 meetupInfo')
      .attr('href', '#')
      .attr('data-title', response[i].organization.charityName)
      .text('Find Meetup Events')
    ;

    $('#charity-list').append(newTitle, ratingImage, newTagline, mission, moreButton, meetupButton)
    if (i < resultCount-1) {
      $('#charity-list').append($('<hr>'));
    }
  }
}

// clears the list of charities on the screen
function clear() {
  $('#charity-list').empty();
}

$('#charity-display').on('click', '.moreInfo', function(event) {
  event.preventDefault();
  var clickedValue = event.currentTarget.attributes[2].value;
  $('#' + clickedValue).toggleClass('hidden');
})

$('#charity-display').on('click', '.meetupInfo', function(event) {
  event.preventDefault();
  console.log(event)
  var charityName = event.currentTarget.attributes[2].value;
  meetupFind(charityName);
})

$('#run-search').on('click', function(e) {
  // prevent page refresh
  e.preventDefault();

  // run URL builder function and set to function scoped variable
  var searchURL = buildURL();

  $.ajax({
    url: searchURL,
    method: 'GET'
  }).then(printResults)
});
