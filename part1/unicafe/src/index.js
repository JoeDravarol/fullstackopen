import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ text }) => <h1>{text}</h1>

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Statistic = ({ text, value }) => <p>{text} {value}</p>

const Statistics = ({ good, neutral, bad }) => {
  const sumAll = good + neutral + bad
  const sumAverage = (good - bad) / sumAll
  const sumPositive = (good / sumAll) * 100

  if (good || neutral || bad) {
    return (
      <div>
        <Statistic text='good' value={good} />
        <Statistic text='neutral' value={neutral} />
        <Statistic text='bad' value={bad} />
        <Statistic text='all' value={sumAll} />
        <Statistic text='average' value={sumAverage} />
        <Statistic text='positive' value={sumPositive + ' %'} />
      </div>
    )
  }

  return (
    <div>
      <Statistic text='No feedback given' />
    </div>
  )
}


const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToValue = (value, setType) => () => setType(value)

  return (
    <div>
      <Header text='give feedback' />
      <Button onClick={setToValue((good + 1), setGood)} text='good' />
      <Button onClick={setToValue((neutral + 1), setNeutral)} text='neutral' />
      <Button onClick={setToValue((bad + 1), setBad)} text='bad' />
      <Header text='statistics' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)