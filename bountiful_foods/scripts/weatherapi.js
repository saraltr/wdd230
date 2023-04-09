const url = "https://api.openweathermap.org/data/2.5/weather?q=Carlsbad&appid=73cb8ad5fb9a00832e5798812757f4d3&units=imperial";

const forecast = "https://api.openweathermap.org/data/2.5/forecast?q=Carlsbad&appid=cfe6dd84498951e1d5f24b029c0cffc0&units=imperial";

const currentTemp = document.querySelector("#currentTemp");
const weatherIcon = document.querySelector("#weatherIcon");
const captionDesc = document.querySelector("figcaption");

async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      displayResults(data);
        // degug console.log(data)
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}
apiFetch();

function displayResults(weatherData){
    if (weatherData.main) {
        currentTemp.innerHTML = `<strong>${weatherData.main.temp.toFixed(0)} °F</strong>`;
        const iconScr = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;

        weatherIcon.setAttribute("src", iconScr);

        const description = weatherData.weather[0].description
        .split(" ")
        .map((word) => {
            return `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
        })
        .join(" ");
        weatherIcon.setAttribute("alt", description);
        captionDesc.innerHTML = `<strong>${description}</strong>`;

    }

    
}