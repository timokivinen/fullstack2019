// --------------------------------------------------------------------------
// --- Tehtävä          3.18f:
// --- Pvm:             26.8.2019 Timo Kivinen
// --- Modified:        26.8.2019: addPerson function modified                 
// --------------------------------------------------------------------------
import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/PersonService'

// -------------------------------------------------------------------------
// --- APP
// -------------------------------------------------------------------------
const App = (props) => {

  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('qwerty')
  const [ newNumber, setNewNumber ] = useState('1234567890')
  const [ newFilter, setNewFilter ] = useState('')

  const [errorMessage, setErrorMessage] = useState('')
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
          console.log("---------------------initialPersons")
          setPersons(initialPersons)
      })
  }, [])          
  
  // --------------------------------------------------------------
  // --- addPerson - Henkilön ja puhelinnumeron lisäys
  // --------------------------------------------------------------
  const addPerson = (event) => {
    event.preventDefault()
    // ---------------------------------------------------------------------
    // --- UUSI HENKILÖ+PUHELINNUMERO
    // --- Jos nimi on jo olemassa, päivitetään puhelinnumero
    // --- Tässä versiossa ei kysellä, halutaanko muuttaa puhelinnumeroa
    // ---------------------------------------------------------------------
    const personObject = {
      name: newName,
      number: newNumber,
    }
    // --- Käytetään uuden rivin luomiseen service-kenttää "create"
    // --- Tehtävä 3.17: päivitetään listatietokannasta, ei konkata
    personService
      .create(personObject)
      .then(returnedPerson => {
        // --- setPersons(persons.concat(returnedPerson))
        // --- Päivitetään lista tietokannasta
        personService
          .getAll()
          .then(initialPersons => {
          setPersons(initialPersons)
          })
        })
        .catch(error => setErrorMessage(`Lisäys epäonnistui. ${error}`))
    
    setErrorMessage(`uusi henkilö lisätty/muutettu.`)
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
    
  } // -- AddPerson


  const deletePerson = (p) => {
    console.log('DELETEPERSON:', p)
  }
  
  // ---------------------------------------------------
  // --- RETURN
  // ---------------------------------------------------
  return (
        <div>
        <h2>Puhelinluettelo</h2>

        <Notification message={errorMessage} />

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
       
        <Persons persons={persons} newFilter={newFilter} setPersons={setPersons} setErrorMessage={setErrorMessage} 
              deletePerson={deletePerson}/>
        </div>
      )
  }

  export default App
