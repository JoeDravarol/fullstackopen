import React, { useState, useEffect } from 'react';
import axios from 'axios'
import config from './config'

const Weather = ({ lat, lng }) => {
  const [weatherData, setWeatherData] = useState('')
  const url = `${config.proxy}${config.url}${lat},${lng}`

  const toCelcius = (fahrenheit) => {
    return Math.round((fahrenheit - 32) * 5 / 9)
  }

  useEffect(() => {
    axios
      .get(url)
      .then(response => {
        setWeatherData(response.data)
      })
  }, [])

  if (weatherData !== '') {
    const fahrenheit = weatherData.currently.temperature

    return (
      <>
        <p><strong>temperature:</strong> {toCelcius(fahrenheit)} in Celcius</p>
        <p><strong>wind:</strong> {weatherData.currently.windSpeed} mph</p>
      </>
    )
  }
  return (
    <>
    </>
  )
}

const Country = ({ country }) => {
  const latitude = country.latlng[0]
  const longitude = country.latlng[1]

  return (
    <div>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h2>Languages</h2>
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={country.flag} alt={`${country.name}'s flag`} width='250px' />
      <h2>Weather in {country.capital}</h2>
      <Weather lat={latitude} lng={longitude} />
    </div>
  )
}

const Countries = ({ filterCountries, setFilter }) => {

  if (filterCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>

  } else if (filterCountries.length > 1) {
    return filterCountries.map(country => (
      <div>
        <p>{country.name} <button onClick={() => setFilter(country.name)}>show</button></p>
      </div>
    ))
  }

  const rows = filterCountries.map(country => <Country country={country} />)

  return (
    <>
      {rows}
    </>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    const url = 'https://restcountries.eu/rest/v2/all'

    axios
      .get(url)
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => setFilter(event.target.value)

  const filterCountries = () => {
    return countries.filter(country => country.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
  }

  const displayCountries = () => {
    if (filter !== '') {
      return <Countries filterCountries={filterCountries()} setFilter={setFilter} />
    }
  }

  return (
    <div>
      find countries <input value={filter} onChange={handleFilterChange} />
      {displayCountries()}
    </div>
  )
}

export default App;
