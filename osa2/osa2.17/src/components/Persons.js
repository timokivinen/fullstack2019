
// --------------------------------------------------------------
// --- Persons-komponentti
// --- 
// --- 21.5.2019 Timo Kivinen
// --------------------------------------------------------------
import React from 'react'
import Person from './Person'

const Persons = (props) => {
    const ppersons=props.persons
    const pfilter=props.newFilter

//    console.log('---1_Persons:', ppersons)
    // ---------------------------------------------------
    // --- Kaikki rivit
    // ---------------------------------------------------    
    const rows_all = () => ppersons.map(person =>
        <Person
        name={person.name}
        number={person.number}
        id={person.id}        
        filter={pfilter}
        />
    )
    return rows_all()
 }
 export default Persons