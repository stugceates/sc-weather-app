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
changeTheme();
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
  return formattedDate;
}
function formattedDay(timestamp){
  const date = new Date(timestamp*1000);
  const day = date.getDay();
  console.log(day);
  const days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
  ];
  return days[day];
}

function changeTheme() {
  const now = new Date();
  const hour = now.getHours();

  if (hour >= 6 && hour < 18) {
    document.querySelector(".weather-app").classList.add("day-bg");
  } else {
    document.querySelector(".weather-app").classList.add("night-bg");
  
  }
}

function getForecast(coordinates){
  console.log(coordinates);
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=fa2f0ab0044e0f6ed0fo3e30511f6tbc&units=metric` ;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
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
  
  getForecast(response.data.coordinates);
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

function displayForecast(response){
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row justify-content-center">`;
  forecast.forEach(function(forescastDay, index){
    if (index < 5){
    forecastHTML = 
      forecastHTML + 
      `<div class="col-md-2 border forecast">
        <div class="forecast-day">${formattedDay(forescastDay.time)}</div>
        <div class="weather-emoji"><img src="${forescastDay.condition.icon_url}"/></div>
        <div class="forecast-temperature">${Math.round(forescastDay.temperature.day)}</div>
      </div>`;
  }
});
  forecastHTML = forecastHTML + `</div>` ;
  forecastElement.innerHTML = forecastHTML;
}



