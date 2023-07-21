import React, {useState} from "react";
import './styling/SearchLocation.css';

import axios from "axios";

function SearchLocation(){
    const [data, setData] = useState({})
    const [place, setPlace] = useState('')
    const [error, setError] = useState(null); // State to handle errors


    const apiKey = "8cce937b472bcf916d60bbbec1d2d248";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${place}&units=imperial&appid=${apiKey}`
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


    return(
        <div className="weatherapp">
          <img className="image-logo" src="https://clipart-library.com/image_gallery2/Earth-PNG-HD.png" alt="" />

            <h2 className="status">Weather Status</h2>

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
                        {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null }
                        <div className="locations">
                        <p>{data.name}</p>
                    </div>
                        <div className="description">

                    {data.weather ? <p>{data.weather[0].main}</p> : null }
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
                    

                    <div className="humidity">
                    {data.main ? <p className="bold">{data.main.humidity}%</p> : null }

                        <p>Humidity</p>

                    </div>

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
