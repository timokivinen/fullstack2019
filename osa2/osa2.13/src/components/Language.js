// --------------------------------------------------------------
// --- Component:   Language
// --- Purpose:     
// --- Date:        9.5.2019 Timo Kivinen
// ---
// --------------------------------------------------------------
import React from 'react'

// --------------------------------------------------------------
// --- Person-komponentti
// --- - listataan rivit, joiden alku noudattaa filtterin toivetta
// --- - palautetaan tyhjä, jos riviä ei tulosteta listalle
// --------------------------------------------------------------

const Language = (props) => {
    // const pkey = props.key
    const planguage = props.language
    return (
        <li>
            {planguage}
        </li>
    )
}
export default Language
