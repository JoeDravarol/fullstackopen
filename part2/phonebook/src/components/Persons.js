import React from 'react'

const Persons = ({ persons, showPerson }) => {

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

  const listPersons = personsToShow().map(person => <li key={person.name}>{person.name} {person.number}</li>)

  return (
    <ul>
      {listPersons}
    </ul>
  )
}

export default Persons