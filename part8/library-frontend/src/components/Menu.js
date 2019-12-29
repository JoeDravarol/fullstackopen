import React from 'react'

const Menu = ({ setPage, token, logout }) => {

  const loggedInNavigation = () => {
    return (
      <>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={logout}>logout</button>
      </>
    )
  }
  return (
    <div>
      <button onClick={() => setPage('authors')}>authors</button>
      <button onClick={() => setPage('books')}>books</button>
      {token
        ? loggedInNavigation()
        : <button onClick={() => setPage('login')}>login</button>
      }
    </div>
  )
}

export default Menu