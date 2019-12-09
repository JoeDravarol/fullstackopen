import React from 'react'
import { incrementVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import Anecdote from './Anecdote'

const AnecdoteList = ({ store }) => {
  const anecdotes = store.getState().anecdotes
  const vote = (anecdote) => () => {
    store.dispatch(
      incrementVote(anecdote.id)
    )

    store.dispatch(
      setNotification(`you voted '${anecdote.content}'`)
    )

    setTimeout(() => {
      store.dispatch(
        setNotification(null)
      )
    }, 5000)
  }

  return (
    <>
      {
        anecdotes.map(anecdote =>
          <Anecdote anecdote={anecdote} onClick={vote(anecdote)} />
        )
      }
    </>
  )
}
export default AnecdoteList