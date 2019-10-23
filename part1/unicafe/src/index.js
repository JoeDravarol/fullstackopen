import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ text }) => <h1>{text}</h1>

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Paragraph = ({ text, statistic }) => <p>{text} {statistic}</p>

const Statistics = ({ good, neutral, bad }) => {
  const sumAll = good + neutral + bad
  const sumAverage = (good - bad) / sumAll
  const sumPositive = (good / sumAll) * 100

  return (
    <>
      <Header text='statistics' />
      <Paragraph text='good' statistic={good} />
      <Paragraph text='neutral' statistic={neutral} />
      <Paragraph text='bad' statistic={bad} />
      <Paragraph text='all' statistic={sumAll} />
      <Paragraph text='average' statistic={sumAverage} />
      <Paragraph text='positive' statistic={sumPositive + ' %'} />
    </>
  )
}


const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(6)
  const [neutral, setNeutral] = useState(2)
  const [bad, setBad] = useState(1)

  const setToValue = (value, setType) => () => setType(value)

  return (
    <div>
      <Header text='give feedback' />
      <Button onClick={setToValue((good + 1), setGood)} text='good' />
      <Button onClick={setToValue((neutral + 1), setNeutral)} text='neutral' />
      <Button onClick={setToValue((bad + 1), setBad)} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)