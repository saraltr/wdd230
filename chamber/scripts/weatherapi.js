// Api url
const url =
  "https://api.openweathermap.org/data/2.5/weather?q=Vincennes,250?id=6613142&appid=73cb8ad5fb9a00832e5798812757f4d3&units=imperial";

const currentTemp = document.querySelector("#currentTemp");
const weatherIcon = document.querySelector("#weatherIcon");
const captionDesc = document.querySelector("figcaption");
const windSpeed = document.querySelector("#windspeed");
const humidity = document.querySelector("#humidity");

// Make an asynchronous API call to fetch the weather data
async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data); // testing the call
      displayResults(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}
apiFetch();

// Update the DOM with the weather data
function displayResults(weatherData) {
  if (weatherData.main) {
    currentTemp.innerHTML = `<strong>${weatherData.main.temp.toFixed(
      0
    )}</strong>`;
    humidity.innerHTML = `Humidity: ${weatherData.main.humidity}%`;
    windSpeed.innerHTML = ` ${weatherData.wind.speed.toFixed(0)} mph`;

    const iconScr = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;

    // Split the description into words and capitalize the first letter of each word
    const description = weatherData.weather[0].description
      .split(" ")
      .map((word) => {
        return `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
      })
      .join(" ");

    weatherIcon.setAttribute("src", iconScr);
    weatherIcon.setAttribute("alt", description);
    weatherIcon.style.width = "50%";
    captionDesc.innerHTML = `<strong>${description}</strong>`;
  } else {
    // Display an error message if there is no weather data
    currentTemp.innerHTML = "<strong>Unavailable</strong>";
    weatherIcon.setAttribute("src", "");
    weatherIcon.setAttribute("alt", "");
    captionDesc.textContent = "Weather data unavailable.";
  }
}
