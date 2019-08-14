// --------------------------------------------------------------------------
// --- Tehtävä:         2.18*: puhelinluettelo step10
// --------------------------------------------------------------------------
import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import personService from './services/PersonService'
  
// -------------------------------------------------------------------------
// --- APP
// -------------------------------------------------------------------------
const App = (props) => {

  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('qwerty')
  const [ newNumber, setNewNumber ] = useState('1234567890')
  const [ newFilter, setNewFilter ] = useState('')
  // -------------------------------------------------------------------------
  // --- Editoiminen on mahdollista, kun rekisteröidään tapahtumankäsittelijä
  // -------------------------------------------------------------------------
  const handleNameChange = (event) => {
      // console.log('handle:', event.target.value)
    setNewName(event.target.value)
  }
  // -------------------------------------------------------------------------
  // --- Editoiminen on mahdollista, kun rekisteröidään tapahtumankäsittelijä
  // -------------------------------------------------------------------------
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  // -------------------------------------------------------------------------
  // --- Editoiminen on mahdollista, kun rekisteröidään tapahtumankäsittelijä
  // -------------------------------------------------------------------------
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }
  // ---------------------------------------------------
  // --- EFFECT HOOK
  // ---------------------------------------------------
  useEffect(() => {
    personService
      .getAll()
        .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])          
  // console.log(persons)

    // --------------------------------------------------------------
    // --- addPerson - Henkilön ja puhelinnumeron lisäys
    // --------------------------------------------------------------
  const addPerson = (event) => {
    // event.preventDefault()

    // --- Löytyykö nimi jo listalta?
    const pos = persons.findIndex(person => person.name.toUpperCase() === newName.toUpperCase())
    if (pos > -1) {
        //console.log('*A***id:', persons[pos].id)
        if (!window.confirm(newName + "' on jo luettelossa, korvataanko numero?")) { 
          return 0
        }

        const personObject = {
          name: newName,
          number: newNumber,
        }
        // ---------------------------------------------------
        // --- PUHELINNUMERON PÄIVITYS
        // ---------------------------------------------------
        personService
          .update(persons[pos].id, personObject)
          setNewName('')
          return 0
      }

      // ---------------------------------------------------
      // --- UUSI HENKILÖ+PUHELINNUMERO
      // ---------------------------------------------------
      const personObject = {
        name: newName,
        number: newNumber,
      }
      // --- Käytetään uuden rivin luomiseen service-kenttää "create"
      personService
        .create(personObject)
          .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
        })
        console.log('*1***UUSI:', persons)
      }

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
