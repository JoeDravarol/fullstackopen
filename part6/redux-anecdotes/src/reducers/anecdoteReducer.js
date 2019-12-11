import anecdoteService from '../services/anecdotes'

const orderByVotes = (anecdotes) => {
  return anecdotes.sort((a, b) => b.votes - a.votes)
}

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'INCREMENT_VOTE':
      const id = action.data.id
      const incrementedAnecdote = action.data
      const newAnecdotes = state.map(anecdote =>
        anecdote.id !== id ? anecdote : incrementedAnecdote
      )
      return orderByVotes(newAnecdotes)
    case 'CREATE_ANECDOTE':
      const anecdote = action.data
      return [...state, anecdote]
    case 'INIT_ANECDOTES':
      return orderByVotes(action.data)
    default:
      return state
  }
}

export const incrementVote = (id, anecdote) => {
  return async dispatch => {
    const returnedAnecdote = await anecdoteService.updateVotes(id, anecdote)
    dispatch({
      type: 'INCREMENT_VOTE',
      data: returnedAnecdote
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default reducer