// --------------------------------------------------------------
// --- Component:   Country
// --- Purpose:     Yksittäisen maan näyttävä komponentti
// --- Date:        10.5.2019 Timo Kivinen
// ---  
// APIXU Key: 1abc4d297ed14be0917173251191105   
// http://api.apixu.com/v1/current.json?key=1abc4d297ed14be0917173251191105&q=Paris
// https://api.apixu.com/v1/current.json?key=1abc4d297ed14be0917173251191105&q=Paris
// HTTP: http://api.apixu.com/v1/forecast.json?key=1abc4d297ed14be0917173251191105&q=Paris
// --------------------------------------------------------------
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Languages from './Languages'

// --------------------------------------------------------------
// --- Näytetään maan tiedot ja sää
// --------------------------------------------------------------
const ShowDetails = (props) => {
    
    const pname=props.name
    const pcapital=props.capital
    const ppopulation=props.population
    const pflag=props.flag    
    const planguages=props.languages
    const [ weather, setWeather] = useState('')
    const [ newFilter, setNewFilter ] = useState('')
    const [ aTemp, setTemp] = useState('')
    const [ aIcon, setIcon] = useState('')
    const [ aWind, setWind] = useState('')
    const [ aDirection, setDirection] = useState('')
    // ---------------------------------------------------
    // ---
    // ---------------------------------------------------
    useEffect(() => {
        axios

            .get('http://api.apixu.com/v1/current.json?key=1abc4d297ed14be0917173251191105&q='+pcapital)
            .then(response => {
                setWeather(response.data)
                setTemp(response.data.current.temp_c)
                setWind(response.data.current.wind_kph)
                setDirection(response.data.current.wind_dir)
                setIcon(response.data.current.condition.icon)
          })
          .catch(error => console.log("ERROR: useEffect:", error))
      }, [])   

    // ---------------------------------------------------
    // ---
    // ---------------------------------------------------
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
            
        <h3>Weather in {pcapital}</h3>
        <b>Temperature: </b> {aTemp}   
        <p>
        <img src={aIcon} alt="No Weather info" ></img>
        </p>
        <b>wind:</b> {aWind}&nbsp;kph&nbsp;direction&nbsp;{aDirection}
    </div>
    )
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
    // --------------------------------------------------------------
    // --- Yksi rivi jäljellä: näytetään maa-tiedot ja sää
    // --------------------------------------------------------------
    if (pdetails === 1) {
        return (
            <ShowDetails name={pname} capital={pcapital} 
                population={ppopulation} flag={pflag} languages={planguages} />
        )

    }
    else 
        // --------------------------------------------------------------
        // --- HTTP POST EI TOIMINUT!
        // --- Jokaisella rivillä on oma nappi, joka aktivoi Button-komponentin
        // --- Käytetään motherFunctionia: asetetaan filterin sisällöksi valittu maa
        // --------------------------------------------------------------
        return (
            <div>
            {pname}&nbsp;&nbsp;
            <Button handleClick={() => pmotherFunction(pname)} text='Show'/> 
        </div>
        )
}

export default Country
