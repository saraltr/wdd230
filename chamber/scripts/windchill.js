let tempString = document.querySelector("#currentTemp").innerHTML;
let temp = parseFloat(tempString);

let windSpeedString = document.querySelector("#windspeed").innerHTML;
let windSpeed = parseFloat(windSpeedString);

let windchill = (t,s) =>
{

 if ((t <= 50) && (s > 3))
 {
  let windchill =  Math.round(35.74 + (0.6215 * t) - ( 35.75 * (s ** 0.16)) + (0.4275 * t * (s ** 0.16)));
  return `${windchill}`;
 }
 else
 {
  return "N/A"
 }
}

document.querySelector("#windchill").textContent = windchill(temp, windSpeed);
