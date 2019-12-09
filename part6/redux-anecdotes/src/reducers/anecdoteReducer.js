const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const orderByLikes = (anecdotes) => {
  return anecdotes.sort((a, b) => b.votes - a.votes)
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
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
      const anecdote = action.data.content
      const newAnecdote = asObject(anecdote)
      return [...state, newAnecdote]
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

export const createAnecdote = (content) => {
  return {
    type: 'CREATE_ANECDOTE',
    data: { content }
  }
}

export default reducer