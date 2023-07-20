import React, {useState} from "react";
import './styling/SearchLocation.css';

import axios from "axios";

function SearchLocation(){
    const [data, setData] = useState({})
    const [place, setPlace] = useState('')

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${place}&units=imperial&appid=8cce937b472bcf916d60bbbec1d2d248
    `
    const SearchLocation = (event) => {
        if (event.key === 'Enter'){
            axios.get(url).then((response) =>{
                setData(response.data)
                console.log(response.data)
            })
            setPlace('')
        }
       
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
                    <div className="location">
                        <p>{data.name}</p>
                    </div>

                    <div className="temperature">
                        {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null }
                       
                    </div>

                    <div className="description">
                    {data.weather ? <p>{data.weather[0].main}</p> : null }

                    </div>
                </div>

            {data.name != undefined&&

                <div className="footer">
                    <div className="feels">
                    {data.main ? <p className="bold">{data.main.feels_like.toFixed()}°F</p> : null }

                        <p>Feels like</p>

                    </div>

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
                 
        </div>
    )
}
export default SearchLocation;
