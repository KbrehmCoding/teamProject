// FUNCTION TO BUILD URL FROM USER INPUTS
function buildURL() {
  // This is the base URL that'll be used to form the specified query
  var queryURL = 'https://api...' //****************************************************** get complete URL

  // Beginning of an object to hold query parameters
  var queryParams = {
    'api-key': 'key goes here'   //**********************************************************  input key once received */
  }

  // setting variables to the input values from the user
  var year = document.querySelector('#year-input').value.trim();
  console.log(year);
  var make = document.querySelector('#make-input').value.trim();
  console.log(make);
  var model = document.querySelector('#model-input').value.trim();
  console.log(model);

  queryParams.year = year; //                ******************************************************these params must be the same as edmunds parameter requirements
  queryParams.make = make;
  queryParams.model = model;


}

// functions for adding to the screen
// grab and print desired information from the json response