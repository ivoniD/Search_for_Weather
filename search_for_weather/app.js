let isCHanged = false;
// l

let weather = {
  apiKey: "0cedd8e9fd3a8f88a6f89de248716349",
  fetchWeather: function (city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`
    )
      .then((res) => {
        if (!res.ok) {
          // alert("NO TOWN");
          document.querySelector(
            ".city"
          ).innerText = `Cant't find town with name "${city}"`;
          document.querySelector(".city").style.color = "red";
          document.querySelector(".city").style.fontStyle = "italic";
          document.querySelector(".city").style.fontSize = "95%";
          document.querySelector(".icon").src = "";
          document.querySelector(".description").innerText = "";
          document.querySelector(".temp").innerText = "";
          document.querySelector(".humidity").innerText = "";
          document.querySelector(".wind").innerText = "";
          document.querySelector(".date").innerText = "";
          document.querySelector(".weather").classList.remove("loading");
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        } else {
          return res.json();
        }
      })
      .then((data) => this.displayWeather(data))
      .catch((error) => {
        console.error("Error:", error);
        throw error;
      });
  },
  displayWeather: function (data) {
    // console.log(data);
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    console.log(name, icon, description, temp, humidity, speed);
    let currentDate = new Date();
    let date = currentDate.toString().slice(0,15);

    document.querySelector(".city").innerText = `Weather in ${name}`;
    document.querySelector(".date").innerText = `${date}`;
    document.querySelector(".city").style.color = "#f7f7f7";
    document.querySelector(".city").style.fontSize = "180%";
    document.querySelector(".city").style.fontStyle = "normal";
    document.querySelector(
      ".icon"
    ).src = `https://openweathermap.org/img/wn/${icon}.png`;
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = `${temp}°C`;
    document.querySelector(".humidity").innerText = `Humidity: ${humidity}%`;
    document.querySelector(".wind").innerText = `Wind speed: ${speed} km/h`;
    document.querySelector(".weather").classList.remove("loading");

    const ACCESS_KEY = "hYM_XTI4rXU0XGcONVmcBs-XQsaUWApvJR4PFsGlwrE";
    const ENDPOINT = `https://api.unsplash.com/search/photos?query=${name}`;

    fetch(ENDPOINT, {
      headers: {
        Authorization: `Client-ID ${ACCESS_KEY}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          alert("Error: " + response.status + " " + response.statusText);
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        } else {
          return response.json();
        }
      })
      .then((d) => this.displayBackground(d))
      .catch((error) => {
        console.error("Error:", error);
        throw error;
      });
  },
  displayBackground: function (d) {
    if (d.results && d.results.length > 0) {
      const url = d.results[0].urls.regular;
      document.body.style.backgroundImage = `url(${url})`;
    } else {
      console.error("Error: No results found");
      document.body.style.backgroundImage = `url('https://static.vecteezy.com/system/resources/previews/002/859/091/original/world-map-background-in-navy-blue-and-gold-free-vector.jpg')`;
    }
  },
  search: function () {
    let input = document.querySelector(".search-bar").value;
    if (!isNaN(input)) {
      document.querySelector(
        ".city"
      ).innerText = `Cant't find town with this name "'${input}'"`;
      document.querySelector(".city").style.color = "red";
      document.querySelector(".city").style.fontStyle = "italic";
      document.querySelector(".city").style.fontSize = "95%";
      document.querySelector(".icon").src = "";
      document.querySelector(".description").innerText = "";
      document.querySelector(".temp").innerText = "";
      document.querySelector(".humidity").innerText = "";
      document.querySelector(".wind").innerText = "";
      document.querySelector(".date").innerText = "";
      document.querySelector(".weather").classList.remove("loading");
    } else {
      this.fetchWeather(document.querySelector(".search-bar").value);
      document.querySelector(".search-bar").innerHTML = "Search for town";
      document.querySelector(".search-bar").value = "";
    }
  },
};

document.querySelector(".search button").addEventListener("click", () => {
  weather.search();
  weather.displayBackground();
});
document.querySelector(".search-bar").addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    weather.search();
    weather.displayBackground();
  }
});
