var loc;
var weathfull;
var weathshort;
var temp;
var humid;
var press;
var farNum;



$(document).ready(function() {
alert("To use this app, please share your location if requested");
getInfos();
document.querySelector("#toC").addEventListener("click", toCelsius);
document.querySelector("#toF").addEventListener("click", toFar);  
});


function getInfos() {
    if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(showPosition)		
    } else { 
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    getData("https://fcc-weather-api.glitch.me/api/current?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude);
}

function getData(address){
  	$.getJSON(address, function(json) {
		loc = json.name;
		weathfull = json.weather[0].description;
		weathshort = json.weather[0].main;
		temp = Math.round(json.main.temp);
		humid = json.main.humidity;
		press = json.main.pressure;
		updateHTML();
		updateBackground();
	});
}

function updateHTML(){
    if (!!!loc) {document.querySelector("#location").textContent = "Unknown Position";} 
    else {document.querySelector("#location").textContent = loc;}    
    document.querySelector("#weather").textContent = weathfull.slice(0,1).toUpperCase() + weathfull.slice(1);
    document.querySelector("#temperature").textContent = temp + "°C";
    document.querySelector("#humidity").textContent = humid;
    document.querySelector("#pressure").textContent = press;
}

function updateBackground() {
	switch (weathshort) {
	  case "Sun":
      case "Clear":
		document.querySelector("body").style.background = "url(img/sun.jpg)";
		break;
      case "Clouds":
        document.querySelector("body").style.background = "url(img/clouds.jpg)";
        break;
      case "Rain":
      case "Drizzle":
      case "Hail":
        document.querySelector("body").style.background = "url(img/rain.jpg)";
        document.querySelector("body").style.color = "black";
        break;
      case "Wind":
      case "Tornado":
        document.querySelector("body").style.background = "url(img/wind.jpg)";
        break;
      case "Fog":
      case "Haze":
        document.querySelector("body").style.background = "url(img/fog.jpg)";
        break;
      case "Snow":
      case "Ice":
        document.querySelector("body").style.background = "url(img/snow.jpg)";
        break;
      case "Thunderstorm":
      case "Thunder":
      case "Storm":
        document.querySelector("body").style.background = "url(img/storm.jpg)";
        document.querySelector("body").style.color = "white";
        break;
	}
}

function toCelsius(){
    document.querySelector("#temperature").textContent = temp + "°C";
    document.querySelector("#toF").classList.remove("btn-primary");
    document.querySelector("#toF").classList.add("btn-default");
    document.querySelector("#toC").classList.add("btn-primary");
    document.querySelector("#toC").classList.remove("btn-default");
    document.querySelector("#toCicon").classList.add("glyphicon");
    document.querySelector("#toCicon").classList.add("glyphicon-ok");
    document.querySelector("#toFicon").classList.remove("glyphicon");
    document.querySelector("#toFicon").classList.remove("glyphicon-ok");    
}

function toFar(){
    farNum = Math.round((temp * 9 / 5) + 32);
    document.querySelector("#temperature").textContent = farNum + "°F";
    document.querySelector("#toF").classList.add("btn-primary");
    document.querySelector("#toF").classList.remove("btn-default");
    document.querySelector("#toC").classList.remove("btn-primary");
    document.querySelector("#toC").classList.add("btn-default");
    document.querySelector("#toCicon").classList.remove("glyphicon");
    document.querySelector("#toCicon").classList.remove("glyphicon-ok");
    document.querySelector("#toFicon").classList.add("glyphicon");
    document.querySelector("#toFicon").classList.add("glyphicon-ok");     
}



