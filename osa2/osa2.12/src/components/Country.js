// --------------------------------------------------------------
// --- Component:   Country
// --- Purpose:     Yksittäisen henkilön renderöivä komponentti
// --- Date:        10.5.2019 Timo Kivinen
// ---  10 h
// --------------------------------------------------------------
import React from 'react'
import Languages from './Languages'
// --------------------------------------------------------------
// --- Person-komponentti
// --- - listataan rivit, joiden alku noudattaa filtterin toivetta
// --- - palautetaan tyhjä, jos riviä ei tulosteta listalle
// // flag: "https://restcountries.eu/data/che.svg"
// --------------------------------------------------------------
const Country = (props) => {
    const pname=props.name
    const pcapital=props.capital
    const ppopulation=props.population
    const pflag=props.flag    
    const planguages=props.languages
    const pdetails=props.details

    if (pdetails === 1) {
        return (
            <div>
                <p>
                    <b> {pname} </b>
                    <br/>
                    Capital &nbsp; {pcapital}<br/>
                    Population &nbsp; {ppopulation}<br/><br/>

                    <b> Language(s) </b><br/>
                    <Languages languages={planguages}/>
                    <img src={pflag} alt="Smiley face" height="42" width="42"></img>
                </p>
            </div>
        )
    }
    else 
        // console.log('pdetails 2 ')
        return (
            <li>
                {pname}
            </li>
        )
}

export default Country
