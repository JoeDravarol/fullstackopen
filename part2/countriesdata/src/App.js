import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Countries from './components/Countries'

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
