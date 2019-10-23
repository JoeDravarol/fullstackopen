import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ text }) => <h1>{text}</h1>

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Statistics = ({ text, ratings }) => <p>{text} {ratings}</p>


const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(6)
  const [neutral, setNeutral] = useState(2)
  const [bad, setBad] = useState(1)

  const setToValue = (value, setType) => () => setType(value) 

  return (
    <div>
      <Header text='give feedback' />
      <Button onClick={setToValue( (good + 1), setGood )} text='good' />
      <Button onClick={setToValue( (neutral + 1), setNeutral)} text='neutral' />
      <Button onClick={setToValue( (bad + 1), setBad)} text='bad' />
      <Header text='statistics' />
      <Statistics text='good' ratings={good} />
      <Statistics text='neutral' ratings={neutral} />
      <Statistics text='bad' ratings={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)