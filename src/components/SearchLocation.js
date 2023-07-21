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



    return(
        <div className="weatherapp">
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

                    {data.weather ? <img src={getWeatherIconUrl(data.weather[0].icon)} alt={data.weather[0].main} /> : null}

                  </div>

                    

                    
                    <br></br>

                    {data.name !== undefined&&

                    <div className="feels">
                        <p>Feels like</p>
                    {data.main ? <p className="bold">{data.main.feels_like.toFixed()}°F</p> : null }

                        

                    </div>

                    }
                      
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
