import React from 'react'

const Persons = ({persons, deletePerson}) => {
    return (
        <div>
          {persons.map(person =>
          <Person key={person.name} person = {person} deletePerson={deletePerson} /> )}
        </div>
    )
}

const Person = ({person, deletePerson}) => {
    return (
        <p> {person.name} {person.number} <button onClick={() => deletePerson(person.id)}>poista</button> </p>
    )

}

export default Persons