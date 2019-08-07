// --------------------------------------------------------------------------
// --- Tehtävä          Osa 1.10 Unicafe step 5 
// --- Pvm:             11.4.2019 Timo Kivinen
// ---                  4.6.2019 (siistitty)  
// --- Aikaa käytetty:  3 h
// --------------------------------------------------------------------------
// - Eriytetään kaksi komponenttia
//   * Button vastaa yksittäistä palautteenantonappia
//   * Statistic huolehtii tilastorivien näyttämisestä
// --------------------------------------------------------------------------
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

// -----------------------------------------------------------
// --- Yhden rivin tilastokomponentti
// -----------------------------------------------------------
const Statistic = (props) => {
  const text = props.text
  const value = props.value
  return (
    <div>
      {text} &nbsp; {value}
    </div>
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
      <h3>Statistiikka</h3>

      <Statistic text="hyvä:" value={good} />
      <Statistic text="neutraali:" value ={neutral} />
      <Statistic text="huono:" value ={bad} />
      <br/>
      <Statistic text="Yhteensä:" value ={good+neutral+bad} />
      <Statistic text="Keskiarvo:" value ={Math.round((good*1 + neutral*0 + bad*-1) /3)} />
      <Statistic text="Positiivisia(%):" value ={Math.round((good / (good+neutral+bad))*100)} />
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

      <Button
          handleClick={() => setGood(good +1)}
          text='Hyvä'
      />
      &nbsp;&nbsp;&nbsp;
      <Button
          handleClick={() => setNeutral(neutral +1)}
          text='Neutraali'
      />
      &nbsp;&nbsp;&nbsp;
      <Button
          handleClick={() => setBad(bad +1)}
          text='Huono'
      />

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
