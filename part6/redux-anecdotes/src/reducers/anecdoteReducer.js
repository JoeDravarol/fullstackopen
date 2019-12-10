const orderByLikes = (anecdotes) => {
  return anecdotes.sort((a, b) => b.votes - a.votes)
}

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'INCREMENT_VOTE':
      const id = action.data.id
      const anecdoteToIncrement = state.find(a => a.id === id)
      const incrementedAnecdote = {
        ...anecdoteToIncrement,
        votes: ++anecdoteToIncrement.votes
      }
      const newAnecdotes = state.map(anecdote =>
        anecdote.id !== id ? anecdote : incrementedAnecdote
      )
      return orderByLikes(newAnecdotes)
    case 'CREATE_ANECDOTE':
      const anecdote = action.data
      return [...state, anecdote]
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const incrementVote = (id) => {
  return {
    type: 'INCREMENT_VOTE',
    data: { id }
  }
}

export const createAnecdote = (data) => {
  return {
    type: 'CREATE_ANECDOTE',
    data
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes
  }
}

export default reducer