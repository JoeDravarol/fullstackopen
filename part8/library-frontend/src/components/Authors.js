import React, { useState } from 'react'

const Authors = ({ show, result, editAuthor }) => {
  const [selectedOption, setSelectedOption] = useState('')

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
    const name = selectedOption
    const setBornTo = Number(target.born.value)

    await editAuthor({
      variables: { name, setBornTo }
    })

    setSelectedOption(authors[0].name)
    target.born.value = ''
  }

  const handleDropdownChange = (e) => {
    setSelectedOption(e.target.value)
  }

  const intializeSelectedOption = () => {
    if (!selectedOption) {
      setSelectedOption(authors[0].name)
    }
  }

  const createNameDropdown = () => {
    intializeSelectedOption()
    
    return (
      <select value={selectedOption} onChange={handleDropdownChange}>
        {authors.map(a =>
          <option key={a.id} value={a.name}>{a.name}</option>
        )}
      </select>
    )
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
        {createNameDropdown()}
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