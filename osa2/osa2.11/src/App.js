// --------------------------------------------------------------
// --- Tehtävä          2.11: puhelinluettelo step6
// --- Pvm:             8.5.2019 Timo Kivinen
// ---                  7.6.2019 (siistitty)  
// --------------------------------------------------------------
import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import Persons from './components/Persons'

// ----------------------------------------------
// --- Pääkomponentti
// ----------------------------------------------
const App = (props) => {
  
    const [ persons, setPersons] = useState([]) 
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
  const AddPerson = (event) => {
    event.preventDefault()
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
  }    

    // ---------------------------------------------------
    // ---
    // ---------------------------------------------------
    useEffect(() => {
      // console.log('---effect')
      axios
        .get('http://localhost:3001/persons')
        .then(response => {
          setPersons(response.data)
        })
    }, [])
    // console.log(persons)        

    // ---------------------------------------------------
    // --- RETURN
    // ---------------------------------------------------
     return (
        <div>
        <h2>Puhelinluettelo</h2>
       
        <div>
            <Filter value={newFilter} handleChange={handleFilterChange}/>
        </div>

        <h3>Lisää uusi</h3>
        
        <form onSubmit={AddPerson}>
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


