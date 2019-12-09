import React from 'react'
import { filterAnecdote } from '../reducers/filterReducer'

const Filter = (props) => {
  const store = props.store

  const style = {
    marginBottom: 10
  }

  const handleChange = (e) => {
    const filterValue = e.target.value
    store.dispatch(
      filterAnecdote(filterValue)
    )
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter