import React, {useState} from "react";
import './styling/SearchLocation.css';

import axios from "axios";

function SearchLocation(){
    const [data, setData] = useState({})
    const [place, setPlace] = useState('')
    const [error, setError] = useState(null); // State to handle errors
    const [unit, setUnit] = useState("imperial"); 

    const apiKey = "8cce937b472bcf916d60bbbec1d2d248";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${place}&units=${unit}&appid=${apiKey}`
    const SearchLocation = (event) => {
        if (event.key === 'Enter'){
            axios.get(url).then((response) =>{
                setData(response.data);
                setError(null); 

             }).catch((error) => {
                setError("Error fetching weather data. Please check the location or try again later.");
                console.error(error);
              });
            setPlace('')
        }
       
    }
   

    const getWeatherIconUrl = (weatherIconCode) => {
        return `http://openweathermap.org/img/wn/${weatherIconCode}.png`;
      }


      const formatDateTime = (timestamp) => {
        // Convert UNIX timestamp to JavaScript Date object
        const date = new Date(timestamp * 1000);
    
        // Format date and time as desired (e.g., "July 21, 2023 13:45")
        const formattedDateTime = date.toLocaleString();
    
        return formattedDateTime;
      }

      const toggleUnit = () => {
        // Toggle between "imperial" (Fahrenheit) and "metric" (Celsius)
        setUnit(unit === "imperial" ? "metric" : "imperial");
      }

      const convertTemperature = (temperature) => {
        // Convert temperature from Fahrenheit to Celsius
        if (unit === "metric") {
          return ((temperature - 32) * 5 / 9).toFixed(1);
        }
        // If the unit is "imperial" (Fahrenheit), return the temperature as it is
        return temperature;
      }


    return(
        <div className="weatherapp">
          <img className="image-logo" src="https://clipart-library.com/image_gallery2/Earth-PNG-HD.png" alt="" />

            <h2 className="status">Weather Status</h2>

 {/* Display temperature unit conversion button */}
            <button className="button1" onClick={toggleUnit}>
             {unit === "imperial" ? "Convert to Celsius" : "Convert to Fahrenheit"}
             </button>

            <div className="search">
                <input
                value={place}
                onChange={event => setPlace(event.target.value)}
                onKeyPress={SearchLocation}
                placeholder="Enter your Location"
                type="text" />
            </div>


            <div className="container">
                <div className="header">
                    

                    <div className="temperature">
                    {data.main && <p className="converted-temp">{convertTemperature(data.main.temp)}°{unit === "imperial" ? "F" : "C"}</p>}
                        <div className="locations">
                        <p>{data.name}</p>
                    </div>
                        <div className="description">
                    {data.weather ? <p>{data.weather[0].main}</p> : null }
                    {data.weather ? <p>{data.weather[0].description}</p> : null }
                    </div>

                    <div className="icon">

                    {data.weather ? <img className="image-icon" src={getWeatherIconUrl(data.weather[0].icon)} alt={data.weather[0].main} /> : null}

                  </div>

                    

                    
                    <br></br>

                    {data.name !== undefined&&

                    <div className="feels">
                        <p>Feels like</p>
                    {data.main ? <p className="bold">{data.main.feels_like.toFixed()}°F</p> : null }

                        

                    </div>
                    

                    }
                    
                       {/* Display date and time */}
                         {data.dt && (
                    <p className="date-time">{formatDateTime(data.dt)}</p>
                    )}
                    </div>

                    
                </div>

            {data.name !== undefined&&

                <div className="footer">
                    
                    <img className="wind-speed-img" src="https://clipart-library.com/data_images/328335.png" alt="" />

                    <div className="humidity">
                    {data.main ? <p className="bold">{data.main.humidity}%</p> : null }

                        <p>Humidity</p>

                    </div>
                    <img className="wind-speed-img" src="https://clipart-library.com/images_k/wind-clipart-transparent/wind-clipart-transparent-13.png" alt="" />

                    <div className="wind">
                    {data.wind ? <p className="bold">{data.wind.speed.toFixed()} MPH</p> : null }

                        <p>Wind Speed</p>
                    </div>

                    
                 </div>
                }
            </div>
            {error && <p className="error-message">{error}</p>}

        </div>
    )
}
export default SearchLocation;
