import React, { useState } from 'react'

const Authors = ({ show, result, editAuthor }) => {
  if (!show) {
    return null
  }

  if (result.loading) {
    return null
  }

  const authors = result.data.allAuthors

  const submitBirthYear = async (e) => {
    e.preventDefault()
    const target = e.target
    const name = target.name.value
    const setBornTo = Number(target.born.value)

    await editAuthor({
      variables: { name, setBornTo }
    })

    target.name.value = ''
    target.born.value = ''
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={submitBirthYear}>
        <div>
          name
          <input type="text" name="name" />
        </div>
        <div>
          born
          <input type="text" name="born" />
        </div>
        <button>update author</button>
      </form>
    </div>
  )
}

export default Authors