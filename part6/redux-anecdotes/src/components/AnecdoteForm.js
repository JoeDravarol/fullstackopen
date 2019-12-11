import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const addAnecdote = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value

    props.createAnecdote(content)
    props.setNotification(`you added '${content}'`)
    e.target.anecdote.value = ''

    setTimeout(() => {
      props.setNotification(null)
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


export default connect(
  null,
  {
    createAnecdote,
    setNotification
  }
)(AnecdoteForm)