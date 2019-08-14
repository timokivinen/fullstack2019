// -----------------------------------------------------------
// --- Tehtävä          2.7: puhelinluettelo step2
// --- Pvm:             4.5.2019 Timo Kivinen
// ---                  6.6.2019 (siistitty)  
// -----------------------------------------------------------
// -- TODO: Template string
// ---      Tee addPerson-komponentti!
// -----------------------------------------------------------
import React, { useState } from 'react'
// import ReactDOM from 'react-dom'

// ----------------------------------------------
// --- Person: näytetään nimi
// ----------------------------------------------
const Person = (props) => {
  const name=props.name
  return (
    <li>
      {name}
    </li>  
  )
}


// ----------------------------------------------
// --- Pääkomponentti
// ----------------------------------------------
const App = (props) => {
  const [ persons, setPersons] = useState([{ name: 'Arto Hellas' }]) 
  const [ newName, setNewName ] = useState('qwerty')
  // ----------------------------------------------
  // --- Editoiminen on mahdollista, kun rekisteröidään tapahtumankäsittelijä
  // ----------------------------------------------
  const handleNoteChange = (event) => {
    setNewName(event.target.value)
    }

  // --- addPerson
  const addPerson = (event) => {
    event.preventDefault()
    // --- Löytyykö nimi jo listalta?
    const pos = persons.findIndex(person => person.name.toUpperCase() === newName.toUpperCase())
    if (pos > -1) {
      alert(`${newName} on jo luettelossa.`)
      return 0
    }
    const noteObject = {name: newName}
    setPersons(persons.concat(noteObject))
    setNewName('')
    console.log('****UUSI:', persons)
  }

  // ---------------------------------------------------
  // ---
  // ---------------------------------------------------
  const rows = () => persons.map(person =>
    <Person
      key={person.name}
      name={person.name}
    />
    )
   return (
    <div>
    <h2>Puhelinluettelo2</h2>
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


