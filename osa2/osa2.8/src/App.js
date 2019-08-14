// --------------------------------------------------------------------------
// --- Tehtävä          2.8: puhelinluettelo step3
// --- Pvm:             4.5.2019 Timo Kivinen
// ---                  6.6.2019 (siistitty)  
// --------------------------------------------------------------------------
import React, { useState } from 'react'
// import ReactDOM from 'react-dom'

// ----------------------------------------------
// ---
// ----------------------------------------------
const Person = (props) => {
  const pname=props.name
  const pnumber=props.number
  console.log('*3*** Person**:', pname)
  return (
    <li>
      {pname}&nbsp;{pnumber}
    </li>  
        
      )
}
// ----------------------------------------------
// --- App-komponentti
// ----------------------------------------------
const App = (props) => {
  
    const [ persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '123456789' }
    ]) 
    const [ newName, setNewName ] = useState('qwerty')
    const [ newNumber, setNewNumber ] = useState('1234567890')

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
        // console.log('handle:', event.target.value)
        setNewNumber(event.target.value)
        }
    
    // ---------------------------------------------------
    // --- addPerson
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
            //date: new Date().toISOString(),
            //important: Math.random() > 0.5,
            //id: notes.length + 1
        }
  
        setPersons(persons.concat(noteObject))
        setNewName('')
        console.log('*1***UUSI:', persons)
    }

    // ---------------------------------------------------
    // ---
    // ---------------------------------------------------
    const rows = () => persons.map(person =>
        <Person
        key={person.name}
        name={person.name}
        number={person.number}
        />
    )

    console.log('-2---rows:', persons)

    return (
        <div>
        <h2>Puhelinluettelo</h2>

        <form onSubmit={addPerson}>
          <div>nimi: <input value={newName} onChange={handleNameChange}/></div>
          <div>numero:<input value={newNumber} onChange={handleNumberChange}/></div>
          <div><button type="submit">lisää</button></div>
          <h2>Numerot</h2>
        </form>

        {rows()}
      
        </div>
    )
  
 
}

export default App
