import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'
import './index.css'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showPerson, setShowPerson] = useState('')
  const [notification, setNotification] = useState(null)

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
        setNotification(
          {
            message: `Added ${returnedPerson.name}`,
            styles: 'success'
          }
        )
        setTimeout(() => {
          setNotification(null)
        }, 5000)
        setPersons(persons.concat(returnedPerson))
      })
      .catch(error => {
        setNotification(
          {
            message: error.response.data.error,
            styles: 'error'
          }
        )
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
  }

  const updateNumber = () => {
    const person = persons.find(p => p.name === newName)
    const isConfirm = window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)

    if (isConfirm) {

      const changedNumber = { ...person, number: newNumber }

      personService
        .update(person.id, changedNumber)
        .then(returnedPerson => {
          setNotification(
            {
              message: `Updated ${returnedPerson.name} number`,
              styles: 'success'
            }
          )
          setTimeout(() => {
            setNotification(null)
          }, 5000)
          setPersons(persons.map(p => p.name !== person.name ? p : returnedPerson))
        })
        .catch(error => {
          setNotification(
            {
              message: `Information of ${person.name} has already been removed from server`,
              styles: 'error'
            }
          )
          setTimeout(() => {
            setNotification(null)
          }, 5000)
          setPersons(persons.filter(p => p.name !== person.name))
        })
    }
  }

  const removePerson = person => {
    const isConfirm = window.confirm(`Delete ${person.name}?`);

    if (isConfirm) {
      personService
        .remove(person.id)
        .then(() => {
          setNotification(
            {
              message: `Removed ${person.name}`,
              styles: 'success'
            }
          )
          setTimeout(() => {
            setNotification(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== person.id))
        })
        .catch(error => {
          setNotification(
            {
              message: `${person.name} was already deleted from server`,
              styles: 'error'
            }
          )
          setTimeout(() => {
            setNotification(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== person.id))
        })
    }
  }

  const handleSubmission = (event) => {
    event.preventDefault()

    const doesNameExist = persons.find(person => person.name === newName) ? true : false;

    if (doesNameExist) {
      updateNumber()
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

      <Notification notification={notification} />

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

      <Persons persons={persons} showPerson={showPerson} removePerson={removePerson} />
    </div>
  )
}

export default App