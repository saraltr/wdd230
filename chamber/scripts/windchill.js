let tempString = document.querySelector("#currentTemp").innerHTML;
let temp = parseFloat(tempString);

let windSpeedString = document.querySelector("#windspeed").innerHTML;
let windSpeed = parseFloat(windSpeedString);

let windchill =  getWindChill(t,s)
{//temp is in fahrenheit and speed is in mph

 if ((t <= 50) && (s > 3))
 {
  //Math.pow is how you write exponents in js!!
  let windchill =  35.74 + (0.6215 * t) - (35.75 * Math.pow(s, 0.16)) + (0.4275 * t * Math.pow(s, 0.16));
  //windchill has a lot of numbers after the decimal, so toFixed(2) makes it so there is only 2 numbers after. Note: the format is in a string.
  document.querySelector("#windchill").innerHTML = "&#xb0;F";
  return windchill.toFixed(2);
 }
 else
 {
  //the temp and/or windspeed don't follow the National Weather Service rules for windchill:
  return "N/A"
 }
}
//print the Windchill in the span on the HTML: 