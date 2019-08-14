// --------------------------------------------------------------
// --- Component:   Country
// --- Purpose:     Yksittäisen henkilön renderöivä komponentti
// --- Date:        10.5.2019 Timo Kivinen
// ---  
// --------------------------------------------------------------
// import React from 'react'
import Languages from './Languages'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

// --------------------------------------------------------------
// --- Person-komponentti
// --- - listataan rivit, joiden alku noudattaa filtterin toivetta
// --- - palautetaan tyhjä, jos riviä ei tulosteta listalle
// // flag: "https://restcountries.eu/data/che.svg"
// --------------------------------------------------------------

// --------------------------------------------------------------
// ---
// --------------------------------------------------------------
const ShowDetails = (props) => {
    //event.preventDefault()
    
    const pname=props.name
    const pcapital=props.capital
    const ppopulation=props.population
    const pflag=props.flag    
    const planguages=props.languages
    
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

// --------------------------------------------------------------
// --- Kökkö ratkaisu
// --- Kerätään HTTP POST-parametrit kasaan ja renderöidään
// --- sivu samalla komponentilla kuin GET:illä
// --------------------------------------------------------------
const ShowDetailsPost = (event) => {
   
    event.preventDefault()

    console.log('*** ShowDetailsPost*1**')
    //--- Country
    let target        = event.target[0]
    const eCountry      = target.name
    const eCountryValue = target.value
    //--- Capital
    target        = event.target[1]
    const eCapital      = target.name
    const eCapitalValue = target.value
    //--- Populus
    target        = event.target[2]
    const ePopulation   = target.name
    const ePopulusValue = target.value
    //--- Flag
    target        = event.target[3]
    const eflag         = target.name
    const eFlagValue    = target.value
    //--- Language
    target        = event.target[4]
    const eLanguage     = target.name
    const eLanguageValue= target.value

    //--- motherFunction
    target        = event.target[5]
    const eMotherFunction       = target.name
    const eMotherFunctionValue  = target.value
    

}

// -----------------------------------------------------------
// --- Nappikomponentti
// -----------------------------------------------------------
const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )
  
// --------------------------------------------------------------
// --- Country
// --------------------------------------------------------------
const Country = (props) => {
    const pdetails=props.details
    const pname=props.name
    const pcapital=props.capital
    const ppopulation=props.population
    const pflag=props.flag    
    const planguages=props.languages
    const pmotherFunction=props.motherFunction

    //--- HTTP GET
    if (pdetails === 1) {
        return (
            <ShowDetails name={pname} capital={pcapital} population={ppopulation} flag={pflag} languages={planguages}/>
        )
    }
    else 
        // --------------------------------------------------------------
        // --- HTTP POST == EI TOIMI!!!
        // --- Postataan tarvittavat parametrit hidden-kenttien avulla
        // --- TÄMÄ TOIMII:
        // --- Jokaisella rivillä on oma nappi, joka aktivoi Button-komponentin
        // --------------------------------------------------------------
        return (
           /*     <form onSubmit={ShowDetailsPost}>
                    <input type="hidden" name="name" value={pname}/>
                    <input type="hidden" name="capital" value={pcapital}/>
                    <input type="hidden" name="population" value={ppopulation}/>
                    <input type="hidden" name="flag" value={pflag}/>
                    <input type="hidden" name="languages" value={planguages}/>
                    <input type="hidden" name="motherFunction" value={pmotherFunction}/>
                    <div>{pname}&nbsp;&nbsp; 
                        <button type="submit">show</button>
                    </div>
                </form>   
                */
                <div>
                    {pname}&nbsp;&nbsp;
                    <Button handleClick={() => pmotherFunction(pname)} text='Show'/> 
                </div>
        )
}

export default Country
