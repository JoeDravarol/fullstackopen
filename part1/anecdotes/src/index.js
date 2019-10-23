import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Anecdote = ({ header, anecdote }) => (
  <>
    <h1>{header}</h1>
    <p>{anecdote}</p>
  </>
)

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0)
  // Create zero filled array into useState
  const [points, setAll] = useState(new Array(anecdotes.length).fill(0))
  const [mostVotes, setMostVotes] = useState(0)

  const sampleAnecdote = () => {
    const sample = Math.floor(Math.random() * anecdotes.length)

    setSelected(sample)
  }

  const setPoints = () => {
    const copy = [...points]

    copy[selected] += 1

    setAll(copy)

    return copy
  }

  const updateMostVotes = () => {
    const newPoints = setPoints()

    let max = 0

    newPoints.forEach((point, i) => {
      if (max < point) {
        
        max = point
        setMostVotes(i)
      }
    })
  }

  return (
    <div>
      <Anecdote header='Anecdote of the day' anecdote={anecdotes[selected]} />
      <p>has {points[selected]} votes</p>
      <Button onClick={updateMostVotes} text='vote' />
      <Button onClick={sampleAnecdote} text='random anecdote' />
      <Anecdote header='Anecdote with most votes' anecdote={anecdotes[mostVotes]} />
      <p>has {points[mostVotes]} votes</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)