// --------------------------------------------------------------
// --- Tehtävä          2.12* maiden tiedot, step1
// --- Pvm:             9.5.2019 Timo Kivinen
// ---                  8.6.2019 (siistitty)  
// --------------------------------------------------------------
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

// ----------------------------------------------
// --- Pääkomponentti
// ----------------------------------------------
const App = (props) => {
  
    const [ countries, setCountries] = useState([]) 
    const [ newFilter, setNewFilter ] = useState('')

    // --- Editoiminen on mahdollista, kun rekisteröidään tapahtumankäsittelijä
    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
    }

    // ---------------------------------------------------
    // ---
    // ---------------------------------------------------
    useEffect(() => {
        console.log('---effect')
        axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => {
            console.log('promise fulfilled ', response.data.length)
            if (response.data.length > 10)
                console.log('---effect  10+')
            setCountries(response.data)
        })
        .catch(error => console.log("ERROR: index.js useEffect:", error))
    }, [])
    // console.log(countries)        

    // ---------------------------------------------------
    // --- RETURN
    // ---------------------------------------------------
    return (
        <div>
            <h2>Maaluettelo</h2>
            <div>
                <Filter value={newFilter} handleChange={handleFilterChange}/>
            </div>
            <Countries countries={countries} newFilter={newFilter} />
        </div>
    )
}

export default App
