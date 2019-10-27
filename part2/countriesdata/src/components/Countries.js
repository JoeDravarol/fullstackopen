import React from 'react'
import Country from './Country'

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

export default Countries