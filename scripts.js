
//object to hold JSON data
var weather = {};

//global variables for lat and long
var latitude = 0;
var longitude = 0;
var displayTemp = 0;

//geolocate funtion to acquire lat and long
function geoFindMe() {
  var output = document.getElementById("out");

  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }

  function success(position) {
    latitude  = position.coords.latitude;
    longitude = position.coords.longitude;

    output.innerHTML = '<p>Latitude is ' + latitude + ' <br>Longitude is '
    + longitude + ' </p>';

    findWeather();
  }

  function error() {
    output.innerHTML = "Unable to retrieve your location";
  }

  output.innerHTML = "<p>Locating...</p>";

  navigator.geolocation.getCurrentPosition(success, error);


}

function convertToF() {
  displayTemp = displayTemp * 1.8 + 32
  document.getElementById('temp').innerHTML = "Temp: " + Math.round(displayTemp) + " F";
  document.getElementById('convert').innerHTML = '<p id="convertLink" onclick="convertToC()">Change to Celsius</p>';
}

function convertToC() {
  displayTemp = (displayTemp - 32) / 1.8;
  document.getElementById('temp').innerHTML = "Temp: " + Math.round(displayTemp) + " C";
  document.getElementById('convert').innerHTML = '<p id="convertLink" onclick="convertToF()">Change to Fahrenheit</p>';
}

//API call to get JSON data for weather info
function findWeather () {
  var requestURL = 'https://fcc-weather-api.glitch.me/api/current?lat=' + latitude + '&lon=' + longitude;
  var request = new XMLHttpRequest();
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();

  request.onload = function() {
    //grab JSON data and place in weather
    weather = request.response;
    displayTemp = Math.round(weather.main.temp);
    var newURL = weather.weather[0].icon; //get URL for icon image from JSON
    document.getElementById('locationName').innerHTML = "Location: " + weather.name;
    document.getElementById('conditions').innerHTML = "Current conditions: " + weather.weather[0].description;
    document.getElementById('temp').innerHTML = "Temp: " + Math.round(weather.main.temp) + " C";
    document.getElementById('icon').innerHTML = "<img src=" + newURL + ">";
    document.getElementById('convert').innerHTML = '<p id="convertLink" onclick="convertToF()">Change to Fahrenheit</p>';
  }
}
