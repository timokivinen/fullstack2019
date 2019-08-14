// --------------------------------------------------------------
// --- Component:   Language
// --- Purpose:     
// --- Date:        9.5.2019 Timo Kivinen
// ---
// --------------------------------------------------------------
import React from 'react'
import Language from './Language'
// --------------------------------------------------------------
// --- Person-komponentti
// --- - listataan rivit, joiden alku noudattaa filtterin toivetta
// --- - palautetaan tyhjä, jos riviä ei tulosteta listalle
// --------------------------------------------------------------

const Languages = (props) => {
    const planguages = props.languages
    
    const rowsToShow = () => planguages.map(language =>
        <Language 
        key={language.name} 
        language={language.name}
        />
    )
    return rowsToShow()
}
export default Languages

