// --------------------------------------------------------------
// --- Component:   Person
// --- Purpose:     Yksittäisen henkilön renderöivä komponentti
// --- Date:        4.5.2019 Timo Kivinen
// ---
// --------------------------------------------------------------
import React from 'react'

// --------------------------------------------------------------
// --- Person-komponentti
// --- - listataan rivit, joiden alku noudattaa filtterin toivetta
// --- - palautetaan tyhjä, jos riviä ei tulosteta listalle
// --------------------------------------------------------------
const Person = (props) => {
    const pname=props.name
    const pnumber=props.number
    const pfilter=props.filter

    if (pname.toUpperCase().startsWith(pfilter.toUpperCase()) ||  pfilter === '') {        
        return (
            <li>
                {pname}&nbsp;{pnumber}
            </li>
        )   
    }

    return ('')      
}
export default Person
