import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const addName = () => {
    const nameObject = { name: newName }

    setPersons(persons.concat(nameObject))

    setNewName('')
  }

  const handleAddName = (event) => {
    event.preventDefault()

    const doesNameExist = persons.find(person => person.name === newName) ? true : false;

    if (doesNameExist) {
      alert(`${newName} is already added to phonebook`)

      setNewName('')
    } else {
      addName()
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)

  const listPersons = () => persons.map(person => <li key={person.name}>{person.name}</li>)

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleAddName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {listPersons()}
      </ul>
    </div>
  )
}

export default App