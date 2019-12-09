import React from 'react'
import { incrementVote } from '../reducers/anecdoteReducer'
import Anecdote from './Anecdote'

const AnecdoteList = ({ store }) => {
  const anecdotes = store.getState()
  const vote = (id) => () => {
    store.dispatch(
      incrementVote(id)
    )
  }

  return (
    <>
      {
        anecdotes.map(anecdote =>
          <Anecdote anecdote={anecdote} onClick={vote(anecdote.id)} />
        )
      }
    </>
  )
}
export default AnecdoteList