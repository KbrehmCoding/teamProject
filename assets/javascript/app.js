/////////////////////////////////////////////////////////////////////////////
// 
// 
//                            EXECUTION CODE
// 
// 
/////////////////////////////////////////////////////////////////////////////

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

  // validating search input is not blank
  if ($('#search-input').val() != '') {

    // prevent page refresh
    e.preventDefault();

    // run URL builder function and set to function scoped variable
    var searchURL = buildURL();

    // ajax call using searchURL
    $.ajax({
      url: searchURL,
      method: 'GET'
    }).then(printResults)  //  run print results function when response is received
  } 
  // clear search parameter after validation is complete
  $('#search-input').val('');
});
