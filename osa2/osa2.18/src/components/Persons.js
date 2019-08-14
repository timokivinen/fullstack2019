// --------------------------------------------------------------
// --- Persons-komponentti
// --- 
// --- 21.5.2019 Timo Kivinen
// --------------------------------------------------------------
import React from 'react'
import Person from './Person'

const Persons = (props) => {
    const p_persons=props.persons
    const p_setPersons=props.setPersons
    const p_filter=props.newFilter
    const p_setErrorMessage=props.setErrorMessage
    
    // ---------------------------------------------------
    // --- Kaikki rivit
    // ---------------------------------------------------    
    const rows_all = () => p_persons.map(person =>
        <Person
        name={person.name}
        number={person.number}
        id={person.id}        
        filter={p_filter}
        persons={p_persons}
        setPersons={p_setPersons}
        setErrorMessage={p_setErrorMessage}
        />
    )
    return rows_all()
 }
 export default Persons