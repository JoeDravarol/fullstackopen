import React from 'react'
import { connect } from 'react-redux'
import { filterAnecdote } from '../reducers/filterReducer'

const Filter = (props) => {
  const style = {
    marginBottom: 10
  }

  const handleChange = (e) => {
    const filterValue = e.target.value
    props.filterAnecdote(filterValue)
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default connect(
  null,
  { filterAnecdote }
)(Filter)