const weather = "https://api.openweathermap.org/data/2.5/weather?q=Carlsbad&appid=73cb8ad5fb9a00832e5798812757f4d3&units=imperial";

const forecast = "https://api.openweathermap.org/data/2.5/forecast?q=Carlsbad&appid=cfe6dd84498951e1d5f24b029c0cffc0&units=imperial";

const currentTemp = document.querySelector("#currentTemp");
const weatherIcon = document.querySelector("#weatherIcon");
const humidity = document.querySelector("#humidity");
const max = document.querySelector("#max");
const min = document.querySelector("#min");
const captionDesc = document.querySelector("#desc");
const tomorrowsTemp = document.querySelector("#tmr");
const forecastDiv = document.querySelector(".forecast");

async function apiFetch(url) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      // console.log(data);
      displayResults(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}
apiFetch(weather);
apiFetch(forecast);

function displayResults(weatherData){
    if (weatherData.main) {
        currentTemp.innerHTML = `<strong>${weatherData.main.temp.toFixed(0)}°F</strong>`;
        const iconScr = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;

        weatherIcon.setAttribute("src", iconScr);
        weatherIcon.setAttribute("id", "main-icon")

        const description = weatherData.weather[0].description
        .split(" ")
        .map((word) => {
            return `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
        })
        .join(" ");
        weatherIcon.setAttribute("alt", description);
        captionDesc.innerHTML = `<strong>${description}</strong>`;
        humidity.innerHTML = `${weatherData.main.humidity}%`;
        max.innerHTML = `${weatherData.main.temp_max}°F`;
        min.innerHTML = `${weatherData.main.temp_min}°F`;

      // forecast
    } if (weatherData.list) {
        // console.log(weatherData.list);

        const selectedIndices = [6, 14, 22]; // 3 diff days
        const threeDays = selectedIndices.map(index => weatherData.list[index]);
        // console.log(threeDays);

        for (const day of threeDays) { 
          const daysDiv = document.createElement("div");
          daysDiv.classList.add("daysDiv");

          // get temp
          const dayTemp = day.main.temp_max;

          // get temp description
          const tempDesc = day.weather[0].main
          .split(" ")
          .map((word) => {
              return `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
          })
          .join(" ");
          // console.log(tempDesc)

          // creating icons el
          const iconSrc = `https://openweathermap.org/img/w/${day.weather[0].icon}.png`;
          const iconsEl = document.createElement("img");
          iconsEl.setAttribute("src", iconSrc);
          iconsEl.setAttribute("id", "weather-icon");
          iconsEl.setAttribute("alt", "weather icon");
          if (iconSrc === 'https://openweathermap.org/img/w/01n.png') {
            iconsEl.setAttribute("id", "clear-icon");
            iconsEl.setAttribute("alt", "clear weather icon");
          }

          // date
          const date = day.dt_txt;
          const parsedDate = new Date(date);
          const formattedDate = parsedDate.toLocaleDateString();
          // console.log(formattedDate);

          // adding the elements to the div
          const dateP = document.createElement("p");
          dateP.innerHTML = `${formattedDate}`;

          const tempP = document.createElement("p");
          tempP.innerHTML = `${dayTemp}°F`;

          const descP = document.createElement("p");
          descP.innerHTML = `${tempDesc}`;

          daysDiv.appendChild(dateP);
          daysDiv.appendChild(tempP);
          daysDiv.appendChild(descP);
          daysDiv.appendChild(iconsEl);
          forecastDiv.appendChild(daysDiv);
        }
        
    }       
}