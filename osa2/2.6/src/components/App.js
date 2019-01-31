import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './Persons'
import PersonForm from './PersonForm'
import Filter from './Filter'
import personService from '../services/persons'

const App = () => {
  const [ persons, setPersons] = useState([])
  
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ findName, setFindName] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(findName.toLowerCase()))

  const addPerson = (event) => {
    event.preventDefault()
    const sameName = persons.filter(person => (person.name === newName))
    if(sameName.length === 0){
      const personObject = {
        name: newName,
        number: newNumber,
        date: new Date().toISOString(),
        important: Math.random() > 0.5,
        id: persons.length + 1,
      }

      personService
        .create(personObject)
        .then(response => {
        setPersons(persons.concat(response.data))
    })
    
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    } else {
       alert(`${newName} on jo luettelossa`)
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleFindNameChange = (event) => {
    console.log(event.target.value)
    setFindName(event.target.value)
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Filter findName={findName} handleFindNameChange={handleFindNameChange} />
      <h2> lisää uusi</h2>
      <PersonForm addPerson={addPerson}
       newName={newName}
       handleNameChange={handleNameChange}
       newNumber={newNumber}
       handleNumberChange={handleNumberChange}/>
      <h3>Numerot</h3>
      <Persons persons={personsToShow}/>
    </div>
  )

}

export default App