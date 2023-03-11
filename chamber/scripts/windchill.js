const tempString = document.querySelector("#currentTemp").textContent;
const temp = parseFloat(tempString);

let windSpeedString = document.querySelector("#windspeed").textContent;
let windSpeedCalc = parseFloat(windSpeedString);

let windchill = (t, s) => {
  if (t <= 50 && s > 3) {
    let windchill = Math.round(
      35.74 + 0.6215 * t - 35.75 * s ** 0.16 + 0.4275 * t * s ** 0.16
    );
    return `${windchill} °F`;
  } else {
    return "N/A";
  }
};
// testing
// console.log(temp, windSpeed);
// console.log(windchill(temp, windSpeed));
document.querySelector("#windchill").textContent = windchill(temp, windSpeed);
