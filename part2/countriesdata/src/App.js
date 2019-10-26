import React, { useState, useEffect } from 'react';
import axios from 'axios'

const Country = ({ country }) => {
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
