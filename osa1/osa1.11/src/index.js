// --------------------------------------------------------------------------
// --- Tehtävä          1.11*: unicafe step6
// --- Pvm:             11.4.2019 Timo Kivinen
// ---                  4.6.2019 (siistitty)  
// --- Aikaa käytetty:  1 h
// --------------------------------------------------------------------------
// - Tilastojen näyttäminen HTML-taulukkona 
// --------------------------------------------------------------------------
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

// -----------------------------------------------------------
// --- Yhden rivin tilastokomponentti
// -----------------------------------------------------------
const Stat = (props) => {
    const text = props.text
    const value = props.value
    return (
        <tr>
            <td>
                {text}
            </td> 
            <td>
                {value}
            </td>
        </tr>    
    )
}

// -----------------------------------------------------------
// --- Tilastokomponentti
// -----------------------------------------------------------
const Statistics = (props) => {
    const good = props.good
    const neutral = props.neutral
    const bad = props.bad

    if (!good && !neutral && !bad) {
        return (
        <div>
            <h3>Ei yhtään palautetta annettu.</h3>
        </div>    
        )
        }

    return (
        <div>
            <br/>
            <table border="1">
            <tbody>
                <tr>
                    <td colSpan="2">
                        <h3>Statistiikka</h3>
                    </td>    
                </tr>    
                <Stat text="hyvä:" value={good} />
                <Stat text="neutraali:" value ={neutral} />
                <Stat text="huono:" value ={bad} />
                <Stat text="Yhteensä:" value ={good+neutral+bad} />
                <Stat text="Keskiarvo:" value ={Math.round((good*1 + neutral*0 + bad*-1) /3)} />
                <Stat text="Positiivisia(%):" value ={Math.round((good / (good+neutral+bad))*100)} />
            </tbody>
            </table>
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

// -----------------------------------------------------------
// --- App-komponentti
// -----------------------------------------------------------
const App = () => {
    // Jokaisella napilla on oma tilansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
        <h3>Anna palautetta</h3>

        <Button handleClick={() => setGood(good +1)} text='Hyvä' />
        &nbsp;&nbsp;&nbsp;
        <Button handleClick={() => setNeutral(neutral + 1)} text='Neutraali'/>
        &nbsp;&nbsp;&nbsp;
        <Button handleClick={() => setBad(bad + 1)} text='Huono'/>

        <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}
// --- End App

// -----------------------------------------------------------
// --- Renderöidään sivu 
// --- Komponentin sisältö asetetaan kohtaan:
// ---    index.html <div id="root"></div>
// -----------------------------------------------------------
ReactDOM.render(<App />, document.getElementById('root'))
