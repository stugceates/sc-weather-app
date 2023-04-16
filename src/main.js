const now = new Date();

const dateElement = document.querySelector("li.day");
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
let tempCelsius = "-";
let position;

const searchForm = document.querySelector("form");
searchForm.addEventListener("submit", submitForm);

const convertCel = document.querySelector("#celsius-link");
convertCel.addEventListener("click", showCelsius);

const convertF = document.querySelector("#fahrenheit-link");
convertF.addEventListener("click", showFahrenheit);

navigator.geolocation.getCurrentPosition(showPosition);


function submitForm(event) {
  event.preventDefault();
  const searchInput = document.querySelector("#search-input");
  const cityName = searchInput.value;
  document.querySelector("h1.city-name").innerHTML = cityName;
  let url = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=fa2f0ab0044e0f6ed0fo3e30511f6tbc&units=metric`;
  axios.get(url).then(function (response) {
    const temp = Math.round(response.data.temperature.current);
    tempCelsius = temp
    document.querySelector("li.temp-value").innerHTML = temp;
  });
  
}

function showCelsius(event) {
  event.preventDefault();
  document.querySelector("li.temp-value").innerHTML = tempCelsius;
}

function showFahrenheit(event) {
  event.preventDefault();
  const cToFahr = (tempCelsius * 9) / 5 + 32;
  document.querySelector("li.temp-value").innerHTML = cToFahr;
}

function showPosition(position){
  /*console.log(position.coords.latitude);
  console.log(position.coords.longitude);*/
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let url = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=fa2f0ab0044e0f6ed0fo3e30511f6tbc&units=metric`;
  axios.get(url).then(function (response) {
    const temp = Math.round(response.data.temperature.current);
    tempCelsius = temp
    document.querySelector("li.temp-value").innerHTML = temp;
    const cityName = response.data.city;
    document.querySelector("h1.city-name").innerHTML = cityName;
  }); 
}




