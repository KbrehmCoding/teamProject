
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

  var stateSelection = $('#state').val();  // need to grab state value from html   ***********************//
  console.log(stateSelection);

  if (stateSelection !== '') {
    queryParameters.state = stateSelection;
  }
  // return the completed URL to the function call
  return queryURL + $.param(queryParameters);
  // CONSOLE LOGS TO ENSURE URL IS CORRECT
  console.log('-----------------------------------------')
  console.log('URL:' + queryURL)
  console.log('-----------------------------------------')
  console.log('-----------------------------------------')
  console.log(queryURL + $.param(queryParameters));
  console.log('-----------------------------------------')
}

function printResults(response) {
  console.log(response);
  // need to write function to take response and print select information to the screen  ************************************************************************ 
}

// clears the list of charities on the screen
function clear() {
  $('#charity-list').empty();
}

$('#run-search').on('click', function(e) {
  // prevent page refresh
  e.preventDefault();
  // clear current results if any
  clear();

  // run URL builder function and set to function scoped variable
  var searchURL = buildURL();

  $.ajax({
    url: searchURL,
    method: 'GET'
  }).then(printResults)
});

// var resultCount = $('#result-count').val()    
// USE THIS WHEN UPDATING THE PAGE. GRABS THE NUMBER OF ARTICLES TO SHOW

// FORMAT TO USE WHEN DISPLAYING IMAGES STARTING WITH H5
/* <div class="card">
  <h5 class="card-header">Featured</h5>
  <div class="card-body">
    <h5 class="card-title">Special title treatment</h5>
    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div> */