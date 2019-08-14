
// --------------------------------------------------------------------------
// --- Tehtävä          2.10: puhelinluettelo step5
// --- Pvm:             8.5.2019 Timo Kivinen
// ---                  7.6.2019 (siistitty)  
// --------------------------------------------------------------------------
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import Filter from './components/Filter'
import Persons from './components/Persons'
// ----------------------------------------------
// ---
// ----------------------------------------------
const App = (props) => {
  
    const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '123456789' },
    { name: 'Martti Tienari', number: '123456789' },
    { name: 'Arto Järvinen', number: '044-33443344' },
    { name: 'Taavi Touhukas', number: '045-123123' },
    { name: 'Retu Kivinen', number: '045-3333333' },
    { name: 'Aappo Jokinen', number: '045-6762229' }
    ]) 

    const [ newName, setNewName ] = useState('qwerty')
    const [ newNumber, setNewNumber ] = useState('1234567890')
    const [ newFilter, setNewFilter ] = useState('')
    // ----------------------------------------------
    // --- Editoiminen on mahdollista, kun rekisteröidään tapahtumankäsittelijä
    // ----------------------------------------------
    const handleNameChange = (event) => {
        // console.log('handle:', event.target.value)
        setNewName(event.target.value)
    }

    // ----------------------------------------------
    // --- Editoiminen on mahdollista, kun rekisteröidään tapahtumankäsittelijä
    // ----------------------------------------------
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
        }

    // ----------------------------------------------
    // --- Editoiminen on mahdollista, kun rekisteröidään tapahtumankäsittelijä
    // ----------------------------------------------
    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
        }
        
    // ---------------------------------------------------
    // ---
    // ---------------------------------------------------
    const addPerson = (event) => {
        event.preventDefault()

        console.log('name:', newName)
        console.log('num:', newNumber)

        // --- Löytyykö nimi jo listalta?
        const pos = persons.findIndex(person => person.name.toUpperCase() === newName.toUpperCase())
        if (pos > -1) {
          alert(`${newName} on jo luettelossa.`)
          return 0
        }

        const noteObject = {
            name: newName,
            number: newNumber
        }
  
        setPersons(persons.concat(noteObject))
        setNewName('')
        console.log('*1***UUSI:', persons)
    }

    return (
      <div>
      <h2>Puhelinluettelo</h2>
      
      <div>
          <Filter value={newFilter} handleChange={handleFilterChange}/>
      </div>

      <h3>Lisää uusi</h3>

      <form onSubmit={addPerson}>
        <div>nimi: <input value={newName} onChange={handleNameChange}/></div>
        <div>numero:<input value={newNumber} onChange={handleNumberChange}/></div>
        <div><button type="submit">lisää</button></div>
      </form>

      <h2>Numerot</h2>
      
      <Persons persons={persons} newFilter={newFilter} />

      </div>
  )
}

export default App
