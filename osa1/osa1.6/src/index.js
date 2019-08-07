// -----------------------------------------------------------
// --- Tehtävä          1.6 step 1: Unicafe
// --- Pvm:             10.4.2019 Timo Kivinen
// ---                  4.6.2019 (siistitty)  
// --- Aikaa käytetty:  5 h
// -----------------------------------------------------------

import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  
  // Jokaisella napilla on oma tilansa
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

      <h3>Statistiikka</h3>

      Hyvä: &nbsp; {good}
      <br/>
      Neutraali: &nbsp; {neutral}
      <br/>
      Huono: &nbsp; {bad}

    </div>
  )
}
// --- End App

// -----------------------------------------------------------
// --- Renderöidään sivu 
// --- Komponentin sisältö asetetaan kohtaan:
// ---    index.html <div id="root"></div>
// -----------------------------------------------------------

ReactDOM.render(<App />, 
  document.getElementById('root')
)
