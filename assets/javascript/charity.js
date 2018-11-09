
function buildURL() {
  var queryURL = 'https://api.data.charitynavigator.org/v2/Organizations?';

  // default parameters on API URL
  var queryParameters = { 
    'app_id': '262a6a90',
    'app_key': 'f2c5607d357d16ed25d52dcea19d248f',
    'pageSize': '10'
  };
  // search parameter
  queryParameters.search = $('#search-input').val().trim();

  // search name only or not   ********************************************************************
  // need to figure out how to grab true/false or checkbox
  var nameSearch = '';  // need a boolean here  ******************************************************

  if (nameSearch) {
    queryParameters.searchType = 'NAME_ONLY';
  };

  // only pull rated charities
  var rated = ''; // need a boolean here   ********************************************************
  if (rated) {
    queryParameters.rated = true;
  };

  var stateSelection = $('#state');  // need to grab state value from html   ***********************//

  if (stateSelection !== '') {
    queryParameters.state = stateSelection;
  }


  console.log('-----------------------------------------')
  console.log('URL:' + queryURL)
  console.log('-----------------------------------------')
  console.log('-----------------------------------------')
  console.log(queryURL + $.param(queryParameters));
  console.log('-----------------------------------------')
}