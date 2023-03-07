// Api url
const url =
  "https://api.openweathermap.org/data/2.5/weather?q=Vincennes,250?id=6613142&appid=73cb8ad5fb9a00832e5798812757f4d3&units=imperial";

// build the HTML structure dynamically

// reference the body element
const body = document.querySelector("body");

// Create an <h1> element and set its text content
const h1 = document.createElement("h1");
h1.textContent = "OpenWeatherMap.org API Test";

// Create a <p> element and set its text content
const paragraph = document.createElement("p");
paragraph.textContent = "The current temperature in Vincennes, France is ";

// Create a <span> element and set its ID attribute
const span = document.createElement("span");
span.setAttribute("id", "current-temp");
paragraph.appendChild(span);

paragraph.innerHTML += "&deg;F"; //Adds the degree symbol

// Create an <h2> element and set its text content
const h2 = document.createElement("h2");
h2.textContent = "Current Condition Icon";

// Create a <figure> element and adds the <img> and <figcaption> elements to it
const figure = document.createElement("figure");
const img = document.createElement("img");
const figcaption = document.createElement("figcaption");
img.setAttribute("id", "weather-icon");
figure.appendChild(img);
figure.appendChild(figcaption);

const humidity = document.createElement("p");
const windSpeed = document.createElement("p");

// Append the elements to the body
body.appendChild(h1);
body.appendChild(paragraph);
body.appendChild(h2);
body.appendChild(figure);
body.appendChild(humidity);
body.appendChild(windSpeed);

const currentTemp = document.querySelector("#current-temp");
const weatherIcon = document.querySelector("#weather-icon");
const captionDesc = document.querySelector("figcaption");

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
    captionDesc.textContent = description;
    humidity.innerHTML = `<strong>Humidity:</strong> ${weatherData.main.humidity}%`;
    windSpeed.innerHTML = `<strong>Windspeed:</strong> ${weatherData.wind.speed.toFixed(
      0
    )}mps`;
  } else {
    // Display an error message if there is no weather data
    currentTemp.innerHTML = "<strong>Unavailable</strong>";
    weatherIcon.setAttribute("src", "");
    weatherIcon.setAttribute("alt", "");
    captionDesc.textContent = "Weather data unavailable.";
  }
}
