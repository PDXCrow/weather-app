
//object to hold JSON data
var weather = {};

//global variables for lat, long and temp display
var latitude = 0;
var longitude = 0;
var displayTemp = 0;


var geoFindMe = () => {
  //geolocate request to acquire lat and long
  var output = document.getElementById("out");

  if (!navigator.geolocation){
    //if geolocate call not available, let user know
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }

  var success = (position) => {
    //if geolocate is successful, set and display global lat and long vars
    latitude  = position.coords.latitude;
    longitude = position.coords.longitude;

    output.innerHTML = '<p id="latLong">Latitude is ' + latitude.toFixed(2)
    + ' <br>Longitude is '
    + longitude.toFixed(2) + ' </p>';

    //once geolocate is successful, call API function to get and display data
    findWeather();
  }

  var error = () => {
    //if geolocate not successful, show alert
    output.innerHTML = "Unable to retrieve your location";
  }

  output.innerHTML = "<p>Locating...</p>";

  navigator.geolocation.getCurrentPosition(success, error);
}


var findWeather = () => {
  //API call to get JSON data for weather info
  var requestURL = 'https://fcc-weather-api.glitch.me/api/current?lat='
  + latitude + '&lon=' + longitude;
  var request = new XMLHttpRequest();
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();

  request.onload = function() {
    //grab JSON data and place in weather
    weather = request.response;
    //set global temp var so it can be unit converted as needed
    displayTemp = weather.main.temp.toFixed(1);
    //get icon url, display loc, condition, temp, icon and conversion link
    var newURL = weather.weather[0].icon;
    document.getElementById('locationName').innerHTML = "Location: "
    + weather.name;
    document.getElementById('conditions').innerHTML = "Current conditions: " + weather.weather[0].description;
    document.getElementById('temp').innerHTML = "Temp: " +
    weather.main.temp.toFixed(1) + " C";
    document.getElementById('icon').innerHTML = "<img src=" + newURL + ">";
    document.getElementById('convert').innerHTML =
    '<p id="convertLink" onclick="convertToF()">Change to Fahrenheit</p>';
    //make div that allows lat/long change visible with results
    document.getElementById("modLoc").style.visibility= 'visible';
  }
}
/*
function convertToF() {
  //convert global display var to Fahrenheit, reset link to convert back to C
  displayTemp = displayTemp * 1.8 + 32;
  document.getElementById('temp').innerHTML = "Temp: " + displayTemp.toFixed(1)
  + " F";
  document.getElementById('convert').innerHTML =
  '<p id="convertLink" onclick="convertToC()">Change to Celsius</p>';
}
*/

var convertToF = () => {
//convert global display var to Fahrenheit, reset link to convert back to C
  displayTemp = displayTemp * 1.8 + 32
  document.getElementById('temp').innerHTML = "Temp: " + displayTemp.toFixed(1)
  + " F";
  document.getElementById('convert').innerHTML =
  '<p id="convertLink" onclick="convertToC()">Change to Celsius</p>';
}

/*
function convertToC() {
  //convert global display var to Celsius, reset link to convert back to F
  displayTemp = (displayTemp - 32) / 1.8;
  document.getElementById('temp').innerHTML = "Temp: " + displayTemp.toFixed(1)
  + " C";
  document.getElementById('convert').innerHTML =
  '<p id="convertLink" onclick="convertToF()">Change to Fahrenheit</p>';
}
*/

var convertToC = () => {
  //convert global display var to Celsius, reset link to convert back to F
  displayTemp = (displayTemp - 32) / 1.8;
  document.getElementById('temp').innerHTML = "Temp: " + displayTemp.toFixed(1)
  + " C";
  document.getElementById('convert').innerHTML =
  '<p id="convertLink" onclick="convertToF()">Change to Fahrenheit</p>';
}

var changeLoc = () => {
  //take user input of new lat and long, resubmit API to get new weather data
  latitude = document.getElementById("newLat").value;
  longitude = document.getElementById("newLong").value;
  document.getElementById('newLat').value=''; //clear field
  document.getElementById('newLong').value=''; //clear field
  //display new lat/long numbers in results
  document.getElementById('latLong').innerHTML = "Latitude is " + latitude
  + "<br>Longitude is " + longitude;
  //call function to provide new data based on revised lat/long
  findWeather();
}
