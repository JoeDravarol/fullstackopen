import React from 'react'
import Anecdote from './Anecdote'
import { incrementVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({ store }) => {
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

  const anecdotesToShow = () => {
    const anecdotes = store.getState().anecdotes
    const anecdoteToFilter = store.getState().filter

    if (anecdoteToFilter !== '') {
      const filteredAnecdotes = anecdotes.filter(anecdote => {
        const content = anecdote.content.toLowerCase()
        const filterValue = anecdoteToFilter.toLowerCase()

        return content.indexOf(filterValue) !== -1
      })

      return filteredAnecdotes
    }

    return anecdotes
  }

  return (
    <>
      {
        anecdotesToShow().map(anecdote =>
          <Anecdote key={anecdote.id} anecdote={anecdote} onClick={vote(anecdote)} />
        )
      }
    </>
  )
}
export default AnecdoteList