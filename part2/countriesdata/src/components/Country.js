import React from 'react'
import Weather from './Weather'

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

export default Country