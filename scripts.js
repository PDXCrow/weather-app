
//geolocate funtion to acquire lat and long
function geoFindMe() {
  var output = document.getElementById("out");

  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }

  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;

    output.innerHTML = '<p>Latitude is ' + latitude + ' <br>Longitude is ' + longitude + ' </p>';
  }

  function error() {
    output.innerHTML = "Unable to retrieve your location";
  }

  output.innerHTML = "<p>Locating...</p>";

  navigator.geolocation.getCurrentPosition(success, error);
}

//API call to get JSON data for weather info
function findWeather () {
  var requestURL = 'https://fcc-weather-api.glitch.me/api/current?lat=35&lon=139';//will need to add actual lat/long eventually
  var request = new XMLHttpRequest();
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();
  request.onload = function() {
  var weather = request.response;
  console.log(weather);
  var newURL = weather.weather[0].icon;
  console.log(newURL);
  document.getElementById('icon').innerHTML = "<img src=" + newURL + ">";
  }
}
