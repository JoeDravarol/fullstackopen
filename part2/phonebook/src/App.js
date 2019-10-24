import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showPerson, setShowPerson] = useState('')

  const addPerson = () => {
    const personObject = {
      name: newName,
      number: newNumber
    }

    setPersons(persons.concat(personObject))
  }

  const handleSubmission = (event) => {
    event.preventDefault()

    const doesNameExist = persons.find(person => person.name === newName) ? true : false;

    if (doesNameExist) {
      alert(`${newName} is already added to phonebook`)
    } else {
      addPerson()
    }

    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => setNewName(event.target.value)

  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const handleFilterChange = (event) => setShowPerson(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={showPerson} onChange={handleFilterChange} />

      <h3>Add a new</h3>

      <PersonForm
        onSubmit={handleSubmission}
        name={{
          value: newName,
          onChange: handleNameChange
        }}
        number={{
          value: newNumber,
          onChange: handleNumberChange
        }}
      />

      <h3>Numbers</h3>

      <Persons persons={persons} showPerson={showPerson} />
    </div>
  )
}

export default App