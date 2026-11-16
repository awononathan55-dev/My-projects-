let weather = {
  "apiKey" : "8c43a00c544c8dda831e9ae88174f19b",

fetchWeather: function (city) {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" +
      this.apiKey +
      "&units=metric"
    )
    .then((response) => response.json())
    .then((data) => this.displayWeather(data));
  },
  displayWeather: function(data){
    const {name} = data;
    const {icon, description} = data.weather[0];
    const {temp, humidity} = data.main;
    const {speed} = data.wind;
    const {visibility} = data;
    const {lat, lon} = data.coord;
    console.log(name, icon, description, temp, humidity, speed, visibility, lat, lon);

    document.querySelector(".City").innerText = name;
    document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temperature").innerText = temp + "°C";
    document.querySelector(".humidity").innerText = humidity;
    document.querySelector(".wind-status").innerText = speed;
    document.querySelector(".visibility").innerText = (visibility / 1000).toFixed(1);

    fetch(
      "https://api.openweathermap.org/data/2.5/air_pollution?lat=" + lat + "&lon=" + lon + "&appid=" + this.apiKey
    )
    .then((response) => response.json())
    .then((data) => {
      const airQuality = data.list[0].main.aqi;
      // 
      switch (airQuality) {
        case 1:
          document.querySelector(".air-quality").innerText = "Good";
          document.querySelector(".aqi-description").innerText = "Healthy";
          break;
        case 2:
          document.querySelector(".air-quality").innerText = "Fair";
          document.querySelector(".aqi-description").innerText = "Acceptable";
          break;
        case 3:
          document.querySelector(".air-quality").innerText = "Moderate";
          document.querySelector(".aqi-description").innerText = "Unhealthy for Sensitive Groups";
          break;
        case 4:
          document.querySelector(".air-quality").innerText = "Poor";
          document.querySelector(".aqi-description").innerText = "Unhealthy";
          break;
        case 5:
          document.querySelector(".air-quality").innerText = "Very Poor";
          document.querySelector(".aqi-description").innerText = "Very Unhealthy";
          break;
      }
    });
  },
};

console.log(weather.fetchWeather("london"));