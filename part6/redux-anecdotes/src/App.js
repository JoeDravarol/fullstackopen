import React from 'react';
import { incrementVote } from './reducers/anecdoteReducer'

const App = (props) => {
  const store = props.store
  const anecdotes = store.getState()

  const vote = (id) => () => {
    store.dispatch(
      incrementVote(id)
    )
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form>
        <div><input /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App