import ReactDOM from 'react-dom'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const ShowCountry = ({country}) => {
    return (
        <div>
            <h2> {country.name} </h2>
            capital {country.capital} <br/>
            population {country.population} <br/>
            <h3> languages </h3>
            {country.languages.map(language =>
                <li key={language.name}> {language.name} </li>)}
            <p><img src={country.flag} alt="flag" height="50" width="70" /></p>
        </div>
    )
}

const ShowCountries = ({countries, findCountry, countriesToShow}) => {
    if(findCountry.length === 0){
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
                <p key={country.name}> {country.name} </p>)} 
            </div>
        )
    }else if(countriesToShow.length === 1){
        return (
            <ShowCountry country={countriesToShow[0]}/>
        )
    }
}

const App = () => {
    const [ countries, setCountries] = useState([])
    const [ findCountry, setFindCountry] = useState('')

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
            <ShowCountries countries={countries} findCountry={findCountry} countriesToShow={countriesToShow} />
        </div>
    </div>
  )

}

export default App
ReactDOM.render(
  <App  />,
  document.getElementById('root')
)