// --------------------------------------------------------------
// --- Component:   Person
// --- Purpose:     Yksittäisen henkilön renderöivä komponentti
// --- Date:        4.5.2019 Timo Kivinen
// ---
// --------------------------------------------------------------
import axios from 'axios'
import React from 'react'
import personService from '../services/PersonService'
const baseUrl = 'http://localhost:3001/persons'
// --------------------------------------------------------------
// --- Kökkö ratkaisu (22.5.2019: Miksi kökkö?)
// --- Kerätään HTTP POST-parametrit kasaan ja renderöidään
// --- sivu samalla komponentilla kuin GET:illä
// --------------------------------------------------------------
const DeletePerson = (event) => {
    // event.preventDefault()    //--- 
    //--- 
    let target        = event.target[0]
    const eName      = target.name
    const eNameValue = target.value
    //--- 
    target        = event.target[1]
    const eNumber = target.name
    const eNumberValue = target.value
    console.log('*ShowDetailsPost: ', target)   
    // ---
    target        = event.target[2]
    const eKey      = target.name
    const eKeyValue = target.value
    console.log('*2ShowDetailsPost: ', target)   
    console.log('*2ShowDetailsPost: ', eKey)   
    console.log('*3ShowDetailsPost: ', eKeyValue)   
    if (!window.confirm("Poistetaanko" + eNameValue + "?")) { 
        return 0
      }    
    // ------------------------------------------------
    // --- Poistetaan valittu rivi
    // ------------------------------------------------
    const request = axios.delete(`${baseUrl}/${eKeyValue}`)

    return (
       <div>
       <p>
           <br/>
       </p>
    </div>
    )    
}

// --------------------------------------------------------------
// --- Person-komponentti
// --- - listataan rivit, joiden alku noudattaa filtterin toivetta
// --- - palautetaan tyhjä, jos riviä ei tulosteta listalle
// --------------------------------------------------------------
const Person = (props) => {
    const pname=props.name
    const pnumber=props.number
    const pid = props.id
    const pfilter=props.filter

    // --------------------------------------------------------------
    // --- HTTP POST
    // --- Postataan tarvittavat parametrit hidden-kenttien avulla
    // --------------------------------------------------------------
    if (pname.toUpperCase().startsWith(pfilter.toUpperCase()) ||  pfilter === '') {        
        return (
            <form onSubmit={DeletePerson}>
                <input type="hidden" name="name" value={pname}/>
                <input type="hidden" name="number" value={pnumber}/>
                <input type="hidden" name="key" value={pid}/>                
                <div>{pname}&nbsp;&nbsp;{pnumber} &nbsp;&nbsp;
                    <button type="submit">delete</button>
                </div>
            </form>    
        )
    }

    return ('')      
}
export default Person
