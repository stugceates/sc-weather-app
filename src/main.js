let tempCelsius = "-";


const searchForm = document.querySelector("form");
searchForm.addEventListener("submit", submitForm);

const convertCel = document.querySelector("#celsius-link");
convertCel.addEventListener("click", showCelsius);

const convertF = document.querySelector("#fahrenheit-link");
convertF.addEventListener("click", showFahrenheit);

const locationButtonElement = document.querySelector("#location-button");
locationButtonElement.addEventListener("click", getLocation);

getLocation();

function getLocation (){
  navigator.geolocation.getCurrentPosition(showPosition);
}

function formatDate(timestamp){
  const now = new Date(timestamp*1000);
  console.log(now);
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
  const formattedDate = `${day}, ${hours}:${minutes}`
  return formattedDate
}

function displayData(response) {
  document.querySelector("#description").innerHTML = response.data.condition.description;
  document.querySelector("#weather-emoji img").src = response.data.condition.icon_url;
  document.querySelector("#humidity span").innerHTML = response.data.temperature.humidity;
  document.querySelector("#wind span").innerHTML = response.data.wind.speed;
  const timestamp = response.data.time;
  document.querySelector("li.day").innerHTML = formatDate(timestamp);
  const temp = Math.round(response.data.temperature.current);
  tempCelsius = temp
  document.querySelector("#temp-value").innerHTML = temp;

  document.querySelector("h1.city-name").innerHTML = response.data.city;
}

function submitForm(event) {
  event.preventDefault();
  const searchInput = document.querySelector("#search-input");
  const cityName = searchInput.value;
  if (searchInput.value) {
    document.querySelector("h1.city-name").innerHTML = cityName;
    let url = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=fa2f0ab0044e0f6ed0fo3e30511f6tbc&units=metric`;
    axios.get(url).then(displayData);
  }
}

function showCelsius(event) {
  event.preventDefault();
  document.querySelector("#temp-value").innerHTML = tempCelsius;
}

function showFahrenheit(event) {
  event.preventDefault();
  const cToFahr = (tempCelsius * 9) / 5 + 32;
  document.querySelector("#temp-value").innerHTML = cToFahr;
}

function showPosition(position){
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let url = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=fa2f0ab0044e0f6ed0fo3e30511f6tbc&units=metric`;
  axios.get(url).then(displayData); 
}





