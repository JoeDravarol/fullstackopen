import React from 'react'
import { connect } from 'react-redux'
import Anecdote from './Anecdote'
import { incrementVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const vote = (anecdote) => () => {
    props.incrementVote(anecdote.id)
    props.setNotification(`you voted '${anecdote.content}'`)

    setTimeout(() => {
      props.setNotification(null)
    }, 5000)
  }

  return (
    <>
      {
        props.visibleAnecdotes.map(anecdote =>
          <Anecdote key={anecdote.id} anecdote={anecdote} onClick={vote(anecdote)} />
        )
      }
    </>
  )
}

const anecdotesToShow = ({ anecdotes, filter}) => {
  const anecdoteToFilter = filter

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

const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: anecdotesToShow(state)
  }
}

const mapDispatchToProps = {
  incrementVote,
  setNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)