const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'FILTER_ANECDOTE':
      return action.data.filterValue
    default:
      return state
  }
}

export const filterAnecdote = (filterValue) => {
  return {
    type: 'FILTER_ANECDOTE',
    data: { filterValue }
  }
}

export default filterReducer