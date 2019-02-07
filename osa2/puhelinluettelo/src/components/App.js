import React, { useState, useEffect } from 'react'
import Persons from './Persons'
import PersonForm from './PersonForm'
import Filter from './Filter'
import personService from '../services/persons'
import NotificationSuccess from './NotificationSuccess';
import NotificationError from './NotificationError';

const App = () => {
  const [ persons, setPersons] = useState([])
  
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ findName, setFindName] = useState('')
  const [ successMessage, setSuccessMessage] = useState(null)
  const [ errorMessage, setErrorMessage] = useState(null)

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
      setSuccessMessage(`Lisättiin ${personObject.name}` )
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } else {
      if( window.confirm(`${sameName[0].name} on jo luettelossa, korvataanko vanha numero uudella?`)){
        const updatePersonObject = {
          name: newName,
          number: newNumber,
          id: persons.length + 1,
        }
        personService
          .update(sameName[0].id, updatePersonObject)
          .then(response => {
            setPersons(persons.map(p => p.id !== sameName[0].id ? p :response ))
          })
          .catch(error => {
            setErrorMessage(
              `Henkilö ${sameName[0].name} oli jo poistettu`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setPersons(persons.filter(n => n.id !== sameName[0].id))
          })
          
      }
    }
  }

  const deletePerson = (id) => {

    const person = persons.find(person => person.id === id)

    if( window.confirm(`Poistetaanko ${person.name}`)){
      personService
        .deleteP(person.id)
        setPersons(persons.filter(pe => pe.id !== person.id ))
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
      <NotificationSuccess message={successMessage} />
      <NotificationError message={errorMessage} />
      <Filter findName={findName} handleFindNameChange={handleFindNameChange} />
      <h2> lisää uusi</h2>
      <PersonForm addPerson={addPerson}
       newName={newName}
       handleNameChange={handleNameChange}
       newNumber={newNumber}
       handleNumberChange={handleNumberChange}/>
      <h3>Numerot</h3>
      <Persons persons={personsToShow} deletePerson={deletePerson}/>
    </div>
  )

}

export default App