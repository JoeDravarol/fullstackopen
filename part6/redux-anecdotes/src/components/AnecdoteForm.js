import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = ({ store }) => {
  const addAnecdote = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    store.dispatch(
      createAnecdote(content)
    )
    e.target.anecdote.value = ''

    store.dispatch(
      setNotification(`you added '${content}'`)
    )

    setTimeout(() => {
      store.dispatch(
        setNotification(null)
      )
    }, 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input type="text" name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm