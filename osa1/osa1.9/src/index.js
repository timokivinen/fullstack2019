// --------------------------------------------------------------------------
// --- Tehtävä          1.9 step 4: Unicafe
// --- Pvm:             11.4.2019 Timo Kivinen
// ---                  4.6.2019 (siistitty)  
// --- Aikaa käytetty:  2 h
// --------------------------------------------------------------------------
// --- Numeeriset tilastot näytetään ainoastaan silloin,
// --- kun palautteita on jo annettu
// --------------------------------------------------------------------------
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

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
        <h3>Ei yhtään palautetta annettu</h3>
      </div>    
    )
  }

  return (
    <div>
      <h3>Statistiikka</h3>
      Hyvä: &nbsp; {good}
      <br/>
      Neutraali: &nbsp; {neutral}
      <br/>
      Huono: &nbsp; {bad}
      <br/>
      Yhteensä: &nbsp; {good+neutral+bad}
      <br/>
      <br/>
      Keskiarvo: &nbsp; {Math.round((good*1 + neutral*0 + bad*-1) /3)}
      <br/>
      Positiivisia: &nbsp; {Math.round((good / (good+neutral+bad))*100)} %
    </div>
  )    
}

  // -----------------------------------------------------------
  // --- App-pääkomponentti
  // -----------------------------------------------------------
const App = () => {
  // --- Jokaisella napilla on oma tilansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h3>Anna palautetta</h3>
      <button onClick={() => setGood(good + 1)}>
            Hyvä 
      </button>
      &nbsp;&nbsp;&nbsp;
      <button onClick={() => setNeutral(neutral + 1)}>
          neutraali
      </button>
      &nbsp;&nbsp;&nbsp;
      <button onClick={() => setBad(bad + 1)}>
          huono
      </button>

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
