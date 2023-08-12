let now = new Date();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let showTime = document.querySelector("h3");
showTime.innerHTML = `${day}, ${hours}:${minutes}`;
function showCelsius(event) {
  event.preventDefault();
  let celsiusTemp = document.querySelector("#temperature");
  celsiusTemp.innerHTML = "30";
}
let clickCelsius = document.querySelector("#celsiusLink");
clickCelsius.addEventListener("click", showCelsius);
function showFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemp = document.querySelector("#temperature");
  fahrenheitTemp.innerHTML = "86";
}
let clickFahrenheit = document.querySelector("#fahrenheitLink");
clickFahrenheit.addEventListener("click", showFahrenheit);
function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-input");
  searchCity(cityInput.value);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);
function showTemperature(response) {
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let degrees = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  let currentTempDisplay = `${degrees}°`;
  temperatureElement.innerHTML = currentTempDisplay;
}
function searchCity(city) {
  let apiKey = "5eb4b597482d62a7617aaa64b6f0ba9c";
  let units = "metric";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiURL).then(showTemperature);
}
function searchMyLocation(position) {
  let apiKey = "5eb4b597482d62a7617aaa64b6f0ba9c";

  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showTemperature);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchMyLocation);
}
let locationButton = document.querySelector("#current-location");
locationButton.addEventListener("click", getCurrentPosition);
