import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showPerson, setShowPerson] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = () => {
    const personObject = {
      name: newName,
      number: newNumber
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
      })
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