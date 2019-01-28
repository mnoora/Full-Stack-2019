import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Martti Tienari', number: '040-123456' },
    { name: 'Arto Järvinen', number: '040-123456' },
    { name: 'Lea Kutvonen', number: '040-123456' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ findName, setFindName] = useState('')

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
      rajaa näytettäviä <input value={findName} onChange={handleFindNameChange} />
      <h2> lisää uusi</h2>
      <form onSubmit={addPerson}>
        <div>
          nimi: <input 
          value= {newName}
          onChange={handleNameChange} 
          />
        </div>
        <div>
            numero: <input 
            value= {newNumber}
            onChange={handleNumberChange} 
            />
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
      <h2>Numerot</h2>
      {personsToShow.map(person =>
        <p key={person.name}> {person.name} {person.number} </p> )}
    </div>
  )

}

export default App