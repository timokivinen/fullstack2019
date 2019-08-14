// -----------------------------------------------------------------------
// --- Component:   Osa 2.14* Maiden tiedot, step3
// --- Purpose:     Lisää yksittäisen maan näkymään pääkaupungin säätiedotus.
// --- Date:        11.5.2019 Timo Kivinen
// --- Notes:       
// -----------------------------------------------------------------------
import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import Countries from './components/Countries'

// ----------------------------------------------
// ---
// ----------------------------------------------
const App = (props) => {
  
    const [ countries, setCountries] = useState([]) 
    const [ newFilter, setNewFilter ] = useState('')

    // ----------------------------------------------
    // --- Motherfunction: set filter
    // ----------------------------------------------
    const filterMotherFunction = (p) => {
        setNewFilter(p)
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
    useEffect(() => {
      axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => {
          console.log('promise fulfilled ', response.data.length)
          setCountries(response.data)
        })
        .catch(error => console.log("ERROR: index.js useEffect:", error))
    }, [])

    // ---------------------------------------------------
    // --- RETURN
    // ---------------------------------------------------
     return (
        <div>
        <h2>Maaluettelo</h2>
        <div>
            <Filter value={newFilter} handleChange={handleFilterChange}/>
        </div>
     
        <Countries countries={countries} newFilter={newFilter} motherFunction={filterMotherFunction} />

        </div>
    )
 }

export default App



