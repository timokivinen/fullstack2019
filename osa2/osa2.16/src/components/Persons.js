
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
    // ---------------------------------------------------
    // --- Kaikki rivit
    // ---------------------------------------------------    
    const rows_all = () => ppersons.map(person =>
        <Person
        key={person.id}
        name={person.name}
        number={person.number}
        filter={pfilter}
        />
    )

    return rows_all()
 }
 export default Persons