
// --------------------------------------------------------------
// --- Countries-komponentti
// --- 
// --- 9.5.2019 Timo Kivinen
// --------------------------------------------------------------
import React from 'react'
import Country from './Country'

const Countries = (props) => {
    const pcountries=props.countries
    const pfilter=props.newFilter
    // ---------------------------------------------------
    // --- Näytetään filtterin ehdottamat rivit
    // ---------------------------------------------------    
    const rowsToRender = pcountries.filter(country => 
        // {return country.name.toUpperCase().startsWith(pfilter.toUpperCase()) ||  pfilter === '' }
        {return country.name.toUpperCase().startsWith(pfilter.toUpperCase()) }
    )

    if (rowsToRender.length > 10)
        return('Too many rows. Please redefine the filter.')

    const rowsToShow = () => rowsToRender.map(country =>
        <Country
        key={country.name}
        name={country.name}
        capital={country.capital}
        population={country.population}
        // --- Näytä maan lippu
        flag={country.flag}
        languages={country.languages}
        // --- Näytä maan detaljitiedot/nimi listalla
        details={rowsToRender.length}
        // filter={pfilter}
        />
    )

    return rowsToShow()
 }
 export default Countries