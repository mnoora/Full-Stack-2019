import ReactDOM from 'react-dom'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({city, weather, setWeather}) => {
    useEffect(() => {
        axios
             .get(`https://api.apixu.com/v1/current.json?key=dd3bd1ecc2404ff483c131132193101&q=${city}`)
             .then(response => {
               setWeather(response.data)
             })
     }, [])
     console.log(city)
     if (!weather) {
        return null
      }
     return(
         <div>
         <strong> temperature: </strong>{weather.current.temp_c} Celsius 
         <p><img src={weather.current.condition.icon} alt="weather icon" height="50" width="70" /></p>
         <strong>wind: </strong> {weather.current.wind_kph} kph direction {weather.current.wind_dir}
         </div>
     )
}

const ShowCountry = ({country, weather, setWeather}) => {
    return (
        <div>
            <h2> {country.name} </h2>
            capital {country.capital} <br/>
            population {country.population} <br/>
            <h3> languages </h3>
            {country.languages.map(language =>
                <li key={language.name}> {language.name} </li>)}
            <p><img src={country.flag} alt="flag" height="80" width="100" /></p>
            <h3>Weather in {country.capital}</h3>
           <Weather city={country.capital} weather={weather} setWeather={setWeather} />           
        </div>
    )
}

const ShowCountries = ({findCountry, countriesToShow, weather, setWeather}) => {
    if(findCountry.length === 0 || countriesToShow.length === 0){
        return (
            <div>
            </div>
        )
    }else if(countriesToShow.length >10){
        return(
            <div>
                Too many matches, specify another filter
            </div>
        )
    }else if(countriesToShow.length < 10 && countriesToShow.length > 1){
        return(
            <div>
                {countriesToShow.map(country =>
                <p key={country.name}> {country.name}  </p> )} 
            </div>
        )
    }else if(countriesToShow.length === 1){
        return (
            <div>
            <ShowCountry country={countriesToShow[0]} weather={weather} setWeather={setWeather}/>
            </div>
        )
    }
}

const App = () => {
    const [ countries, setCountries] = useState([])
    const [ findCountry, setFindCountry] = useState('')
    const [ weather, setWeather] = useState(null)

    const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(findCountry.toLowerCase()))

    useEffect(() => {
        axios
          .get('https://restcountries.eu/rest/v2/all')
          .then(response => {
            setCountries(response.data)
          })
      }, [])

      const handleFindCountryChange = (event) => {
        console.log(event.target.value)
        setFindCountry(event.target.value)
      }

    

  return (
    <div>
        <div>
            find countries <input 
            value= {findCountry}
            onChange={handleFindCountryChange} 
            />
        </div>
        <div>
            <ShowCountries countries={countries} findCountry={findCountry} countriesToShow={countriesToShow} weather={weather} setWeather={setWeather} />

        </div>
    </div>
  )

}

export default App
ReactDOM.render(
  <App  />,
  document.getElementById('root')
)