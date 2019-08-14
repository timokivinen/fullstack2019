// -----------------------------------------------------------------------
// --- Tehtävä:         2.13*: maiden tiedot, step2
// --- Date:            11.5.2019 Timo Kivinen
// -----------------------------------------------------------------------
// --- Kun sivulla näkyy useiden maiden nimiä, tulee maan nimen
// --- viereen nappi, jota klikkaamalla pääsee suoraan maan näkymään
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
    // console.log('---effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        // console.log('promise fulfilled ', response.data.length)
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
      <Countries countries={countries} newFilter={newFilter} motherFunction={filterMotherFunction}/>
      </div>
  )
}

export default App
