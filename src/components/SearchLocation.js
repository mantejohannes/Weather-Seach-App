import React, {useState} from "react";

function SearchLocation(){

    const [cityName, setCityName] = useState('');

    const handleInputChange = (event) => {
        setCityName(event.target.value);
      };



    return(
        <div>
                <h1>Weather Search</h1>

                <input
                    type="text"
                    value={cityName}
                    onChange={handleInputChange}
                    placeholder="Enter your city"
                />

        </div>
    )
}
export default SearchLocation;
