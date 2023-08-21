import React, { useState } from 'react'
import '../WeatherApp/WeatherApp.css'
import clear_icon from "../weather-app-img/clear.png"
import clouds_icon from "../weather-app-img/clouds.png"
import drizzle_icon from "../weather-app-img/drizzle.png"
import humidity_icon from "../weather-app-img/humidity.png"
import storm_icon from "../weather-app-img/storm.png"
import mist_icon from "../weather-app-img/mist.png"
import rain_icon from "../weather-app-img/rain.png"
import snow_icon from "../weather-app-img/snow.png"
import wind_icon from "../weather-app-img/wind.png"
const WeatherApp = () => {
  let api_key ="ab76394fbc9fe62499e25aa837b38f04";

  const [wicon, setwicon] = useState(clouds_icon);
  const [error, setError] = useState("");

  const search = async () => {
    const element = document.getElementsByClassName("cityinput");
    if(element[0].value==="")
    {
      return 0;
    }
    

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

    let response = await fetch (url);
    let data = await response.json();

    if(response.status == 404){
      document.querySelector(".error").style.display = "block"
    }
    else{
      const humidity = document.getElementsByClassName("humidity-percent");
      const wind = document.getElementsByClassName("wind-rate");
      const temprature = document.getElementsByClassName("weather-temp");
      const location = document.getElementsByClassName("weather-location");
      const country = document.getElementsByClassName("weather-country")
  
    
      wind[0].innerHTML = data.wind.speed+"  km/h";
      temprature[0].innerHTML = Math.floor(data.main.temp)+"°C";
      location[0].innerHTML = data.name ;
      country[0].innerHTML = data.sys.country;
      humidity[0].innerHTML = data.main.humidity + "%";
  
      if (data.weather[0].icon==="01d" || data.weather[0].icon==="01n") {
        setwicon(clear_icon);
      }
      else if (data.weather[0].icon==="02d" || data.weather[0].icon==="02n") {
        setwicon(clouds_icon);
      }
      else if (data.weather[0].icon==="03d" || data.weather[0].icon==="03n") {
        setwicon(drizzle_icon);
      }
      else if (data.weather[0].icon==="04d" || data.weather[0].icon==="04n") {
        setwicon(drizzle_icon);
      }
      else if (data.weather[0].icon==="09d" || data.weather[0].icon==="09n") {
        setwicon(rain_icon);
      }
      else if (data.weather[0].icon==="10d" || data.weather[0].icon==="10n") {
        setwicon(rain_icon);
      }
      else if (data.weather[0].icon==="11d" || data.weather[0].icon==="11n") {
        setwicon(storm_icon);
      }
      else if (data.weather[0].icon==="13d" || data.weather[0].icon==="13n") {
        setwicon(snow_icon);
      }
      else if (data.weather[0].icon==="50d" || data.weather[0].icon==="50n") {
        setwicon(mist_icon);
      }
      else{
        setwicon(clear_icon);
      }
      document.querySelector(".error").style.display = "none"
    }

    
   
  }

  return (
  
     
      <div className="container">
         <div className="top-bar">
              <input type="text" className="cityinput" placeholder='CITY NAME'required />
              <div className="search-icon" onClick={() => {search()}}>
                  <img src={wicon} alt=""/>
              </div>
          </div>
          <div className="error">Invalid City Name (or) Check Spelling... </div>
          <div className="weather-image">
            <img src={wicon} alt="" />
          </div>
          <div className="weather-temp">24°C</div>
          <div className="weather-location">London</div>
          <div className="weather-country">UK</div>
          <div className="data-container">
            <div className="element">
              <img src={humidity_icon} alt="" className="icon" />
              <div className="data">
                <div className="humidity-percent">64%</div>
                <div className="text">Humidity</div>
              </div>
            </div>
            <div className="element">
              <img src={wind_icon} alt="" className="icon" />
              <div className="data">
                <div className="wind-rate">18 km/h</div>
                <div className="text">Wind Speed</div>
              </div>
            </div>
          </div>  
         </div>
  )
}

export default WeatherApp