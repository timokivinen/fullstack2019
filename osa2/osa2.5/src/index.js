// --------------------------------------------------------------------------
// --- Tehtävä          2.5: Kurssitiedot, erillinen moduuli
// --- Pvm:             29.4.2019 Timo Kivinen
// ---                  4.6.2019 (siistitty)  
// --- Aikaa käytetty:  2 h
// --------------------------------------------------------------------------
// --- Määrittele komponentti Course omana moduulinaan, 
// --- jonka komponentti App importtaa. 
// --------------------------------------------------------------------------
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import Courses from './components/Courses'

// -----------------------------------------------------------
// --- App komponentti
// --- 1) sisältää datan
// --- 2) kutsuu muita komponentteja parametrien välityksellä
// -----------------------------------------------------------
const App = () => {

// --- Määrittelyt: Olion kaltainen rakenne
const courses = [
  {
    name: 'Half Stack -sovelluskehitys',
    id: 1,
    parts: [
      {
        name: 'Reactin perusteet',
        exercises: 10,
        id: 1
      },
      {
        name: 'Tiedonvälitys propseilla',
        exercises: 7,
        id: 2
      },
      {
        name: 'Komponenttien tila',
        exercises: 14,
        id: 3
      }
    ]
  },
  {
    name: 'Node.js',
    id: 2,
    parts: [
      {
        name: 'Routing',
        exercises: 3,
        id: 1
      },
      {
        name: 'Middlewaret',
        exercises: 7,
        id: 2
      }
    ]
  },
  {
    name: 'Hubba bubba',
    id: 3,
    parts: [
      {
        name: 'haa haa',
        exercises: 3,
        id: 1
      },
      {
        name: 'höö höö',
        exercises: 7,
        id: 2
      }
    ]
  }  
]

  
// -----------------------------------------------------------  
// --- Kutsut komponentteihin
// --- <Total total={excercise_total} />
// ----------------------------------------------------------- 
  return (
    <div>
      <Courses courses={courses}/>
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
  