const param = {
  url: "https://api.openweathermap.org/data/2.5/",

  appid: "522f7ec766b55c89fccbc47a4e7a72c0",
};

function getWeather() {
  const city = document.querySelector(".input-header__input").value;

  if (!city) {
    alert("Please enter a city");
    return;
  }
  ///
  console.log(city);
  ///

  fetch(`${param.url}weather?q=${city}&appid=${param.appid}`)
    .then((weather) => {
      return weather.json();
    })

    .then(showWeather);
}

document.querySelector(".input-header__btn").onclick = getWeather;

const dirWind = (d) => {
  const directions = [
    "Northerly",
    "North Easterly",
    "Easterly",
    "South Easterly",
    "Southerly",
    "South Westerly",
    "Westerly",
    "North Westerly",
  ];
  if (d < 0) {
    d = 360 - (Math.abs(d) % 360);
  } else {
    d = d % 360;
  }
  return `${directions[(d / 45) | 0]}`;
};

function showWeather(data) {
  ///
  console.log(data);
  ///
  const city = document.querySelector(".body-weather__city");
  const temperature = document.querySelector(".body-weather__temp");
  const cloud = document.querySelector(".body-weather__cloud");
  const windDirections = document.querySelector(".weather-bottom__direction");
  const windSpeed = document.querySelector(".weather-bottom__speed");
  const Humidity = document.querySelector(".weather-bottom__humidity");
  const airPressure = document.querySelector(".weather-bottom__pressure");
  const icon = document.querySelector(".body-weather__icon");
  const error = document.querySelector(".body-weather__error");

  city.innerHTML = "";
  temperature.innerHTML = "";
  cloud.textContent = " ";
  windDirections.innerHTML = "";
  windSpeed.textContent = " ";
  Humidity.textContent = " ";
  airPressure.textContent = " ";
  icon.innerHTML = "";
  error.innerHTML = "";
  if (data.cod === "404") {
    error.innerHTML = `<p>${data.message}</p>`;
  } else {
    city.textContent = data.name;
    temperature.innerHTML = Math.round(data.main.temp - 273.15) + "&deg";
    cloud.textContent = data.weather[0]["description"];
    windDirections.innerHTML = dirWind(data.wind.deg);
    windSpeed.textContent = `Wind Speed ${data.wind.speed} km/h`;
    Humidity.textContent = ` Humidity ${data.main.humidity} %`;
    airPressure.textContent = `Air pressure ${data.main.pressure}  hPa`;
    icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]["icon"]}@2x.png">`;
  }
}
