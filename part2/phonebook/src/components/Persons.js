import React from 'react'

const Button = ({ person, removePerson }) => {
  return <button onClick={() => removePerson(person)}>delete</button>
}

const Persons = ({ persons, showPerson, removePerson }) => {

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



  const listPersons = personsToShow().map(person => <li key={person.name}>{person.name} {person.number} <Button person={person} removePerson={() => removePerson(person)} /></li>)

  return (
    <ul>
      {listPersons}
    </ul>
  )
}

export default Persons