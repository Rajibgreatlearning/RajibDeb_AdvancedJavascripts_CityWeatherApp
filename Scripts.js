const inputField = document.getElementById("inputField");
const serachBtn = document.getElementById("searchBtn");
const resetBtn=document.querySelector("#resetBtn");
const weatherInformationOp = document.querySelector(".WeatherInformation");
const loc = document.querySelector(".loc");
const banner = document.getElementById("banner");
var myApiKey = '38e080b0833284de10824ff1ac8f38a9';
//

window.onload = () => {
    weatherInformationOp.style.display = "none";
    resetBtn.style.display="none";
}

serachBtn.onclick = () => {
    if (inputField.value != null) {
        var city = inputField.value;
        searchCityWeather(city);
    }
    
    

}

function searchCityWeather(city) {
    var api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${myApiKey}`;
    fetch(api).then(response => response.json()).then(result => weatherDetails(result));
}

function weatherDetails(info) {
    // console.log(info);
    // console.log(info.cod);
   
    var cod = info.cod;
    if (cod >= 400) {
        var message = `* please verify the city name!`;
        banner.classList.add("fail");
        banner.classList.remove("success");
        banner.innerHTML = message;
    } else {
        serachBtn.style.display="none";
        weatherInformationOp.style.display = "block";
        banner.style.display = "none";
        resetBtn.style.display="block";
        collectData(info);

    }


}

function collectData(info) {

    loc.innerHTML = `<div id="country">Country Code: ${info.sys.country}</div>
     <div id="city">City: ${info.name}</div>`;

    weatherInformationOp.innerHTML = `<div id="weather">The Weather: ${info.weather[0].main}</div>
     <div id="actual"> ${info.main.temp}°C</div>
     <div class="temp">
         
         <div id="feels">Feels like: ${info.main.feels_like}°C</div>
         <div id="min_temp">Minimum temperature: ${info.main.temp_min}°C</div>
         <div id="max_temp">Maximum temperature: ${info.main.temp_max}°C</div>
     </div>

     <div class="humidity">
         Humidity
         <span> ${info.main.humidity}%</span>
     </div>

     <div class="wind">
         Wind Speed:
         <span id="speed"> ${info.wind.speed}</span>kmph
     </div>`;

}

resetBtn.onclick=()=>{
    resetBtn.style.display="none";
    location.reload();
    serachBtn.style.display="block";
}
