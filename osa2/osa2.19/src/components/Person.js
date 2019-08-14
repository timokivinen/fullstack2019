﻿// --------------------------------------------------------------
// --- Component:   Person
// --- Purpose:     Yksittäisen henkilön renderöivä komponentti
// ---              Muodostetaan delete-nappi
// --- Date:        25.5.2019 Timo Kivinen
// --- Fixes:       13.8.2019      
// --------------------------------------------------------------
// import axios from 'axios'
import React from 'react'
import personService from '../services/PersonService'

const baseUrl = 'http://localhost:3001/persons'

// --------------------------------------------------------------
// --- Poistetaan rivi
// --- Palautetaan kaikki muut rivit paitsi poistettava (filterillä)
// --------------------------------------------------------------
const DeleteItem = (props) => {
    const p_id = props.id

    const respData = personService.deletePerson(props.id)
    console.log('***respData: ', respData)

    props.setErrorMessage(`Henkilö  '${props.name}' on poistettu.`)

    setTimeout(() => {
        props.setErrorMessage(null)
    }, 3000)

    // --- Palautetaan kaikki muut rivit paitsi parametrina oleva rivi
    props.setPersons(props.persons.filter(person => {
        return person.id !== props.id
    }))
}

// --------------------------------------------------------------
// --- Person-komponentti
// --- - listataan rivit, joiden alku noudattaa filtterin toivetta
// --- - palautetaan tyhjä, jos riviä ei tulosteta listalle
// --------------------------------------------------------------
const Person = (props) => {
    const p_name=props.name

    if (props.name.toUpperCase().startsWith(props.filter.toUpperCase()) ||  props.filter === '') {
        return (
            <div>{props.name}&nbsp;&nbsp;{props.number} &nbsp;&nbsp;
                <button onClick={(e)=>DeleteItem(props)}>
                    Delete
                </button>   
            </div> 
        )
    }
    return ('')      
}

export default Person

