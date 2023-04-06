const now = new Date();

const dateElement = document.querySelector("h2.current-date");
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
const day = days[now.getDay()];
const hours = now.getHours().toString().padStart(2, "0");
const minutes = now.getMinutes().toString().padStart(2, "0");
dateElement.innerHTML = `${day}, ${hours}:${minutes}`;
const tempCelsius = 8;

const cityName = document.querySelector("form");
cityName.addEventListener("submit", submitForm);

/*
const convertCel = document.querySelector("#celsius-link");
convertCel.addEventListener("click", showCelsius);

const convertF = document.querySelector("#fahrenheit-link");
convertF.addEventListener("click", showFahrenheit);
*/

/** */

const button = document.querySelector(".location-button");
button.addEventListener("click", getCurrentPosition);

function submitForm(event) {
  event.preventDefault();
  const searchInput = document.querySelector("#search-input");
  const cityName = searchInput.value;
  document.querySelector("h1.city-name").innerHTML = cityName;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=50c2acd53349fabd54f52b93c8650d37`;
  axios.get(url).then(function (response) {
    const temp = Math.round(response.data.main.temp);
    document.querySelector("h2.temp-value").innerHTML = temp;
  });
}

/*
function showCelsius(event) {
  event.preventDefault();
  document.querySelector("h2.temp-value").innerHTML = tempCelsius;
}

function showFahrenheit(event) {
  event.preventDefault();
  const cToFahr = (tempCelsius * 9) / 5 + 32;
  document.querySelector("h2.temp-value").innerHTML = cToFahr;
}
*/
function showPosition(position){
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
}

function getCurrentPosition(){
  navigator.geolocation.getCurrentPosition(position);
}