import React from 'react'

const Anecdote = ({ anecdote: { id, content, votes }, onClick }) => {
  return (
    <div key={id}>
      <div>
        {content}
      </div>
      <div>
        has {votes}
        <button onClick={onClick}>vote</button>
      </div>
    </div>
  )
}

export default Anecdote