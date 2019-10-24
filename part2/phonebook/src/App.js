import React, { useState } from 'react'

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

  const clearInputs = () => {
    setNewName('')
    setNewNumber('')
  }

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

    clearInputs()
  }

  const handleNameChange = (event) => setNewName(event.target.value)

  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const handleFilterChange = (event) => setShowPerson(event.target.value)

  const personsToShow = () => {
    if (showPerson !== '') {
      const filterList = persons.filter(person => {
        const names = person.name.toLowerCase()
        const filterValue = showPerson.toLowerCase()

        return names.indexOf(filterValue) !== -1
      })
      
      return filterList
    }

    return persons
  }

  const listPersons = () => personsToShow().map(person => <li key={person.name}>{person.name} {person.number}</li>)

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={showPerson} onChange={handleFilterChange} />
      </div>
      <h2>Add a new</h2>
      <form onSubmit={handleSubmission}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          numbers: <input value={newNumber} onChange={handleNumberChange} />
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