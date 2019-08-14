// -----------------------------------------------------------
// --- Tehtävä          2.6: puhelinluettelo step1
// --- Pvm:             10.5.2019 Timo Kivinen
// ---                  4.6.2019 (siistitty)  
// -----------------------------------------------------------
import React, { useState } from 'react'

// -----------------------------------------------------------
// --- Person
// -----------------------------------------------------------
const Person = (props) => {
  const name=props.name
  console.log('****Person**:', name)
  return (
    <li>
      {name}
    </li>  
  )
}

// -----------------------------------------------------------
// --- Pääkomponentti
// -----------------------------------------------------------
const App = (props) => {
  
  const [ persons, setPersons] = useState([ { name: 'Arto Hellas' } ]) 
  const [ newName, setNewName ] = useState('Jaska Javanen')
  
  // --- Editoiminen on mahdollista, kun rekisteröidään tapahtumankäsittelijä
  const handleNoteChange = (event) => {
    setNewName(event.target.value)
  }

  // ---------------------------------------------------
  // --- addPerson
  // ---------------------------------------------------
  const addPerson = (event) => {
        event.preventDefault()
        const noteObject = {
          name: newName
        }
    setPersons(persons.concat(noteObject))
    setNewName('')
  }

  
  const rows = () => persons.map(person =>
    <Person
      key={person.name}
      name={person.name}
    />
  )
  // ---------------------------------------------------
  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <form onSubmit={addPerson}>
          nimi: 
          <input value={newName} onChange={handleNoteChange}
          />
          <button type="submit">lisää</button>
          <h2>Numerot</h2>
      </form>
      {rows()}
    </div>
  )
}

export default App



