import React, { useState, useEffect } from 'react';
import axios from 'axios'
import config from '../config'

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

export default Weather