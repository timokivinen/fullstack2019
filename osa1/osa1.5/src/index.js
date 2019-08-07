// -----------------------------------------------------------
// --- Tehtävä          1.5: kurssitiedot, step5
// --- Pvm:             6.4.2019 Timo Kivinen
// ---                  4.6.2019 (siistitty)  
// --- Aikaa käytetty:  3 h
// -----------------------------------------------------------

import React from 'react'
import ReactDOM from 'react-dom'

// -----------------------------------------------------------
// --- Kurssien nimien muotoilu (renderöinti)
// -----------------------------------------------------------
const Header = (props) => {
  return (
    <div>
      <p> 
        <b>Kurssi:</b>&nbsp;&nbsp;{props.course}
        <br/>
      </p>
    </div>
  )
}

// -----------------------------------------------------------
// --- Kurssien osat ja tehtävämäärät
// ----------------------------------------------------------- 
const Content = (props) => {
  return (
    <div>
      <Part part={props.parts[0].name} exercises={props.parts[0].exercises}/>
      <Part part={props.parts[1].name} exercises={props.parts[1].exercises}/>
      <Part part={props.parts[2].name} exercises={props.parts[2].exercises}/>
    </div>
  )
}

// -----------------------------------------------------------
// --- Renderöidään kurssin osan nimi ja sen tehtävämäärä
// -----------------------------------------------------------
const Part = (props) => {
  return (
    <div>
    <p>
      <b>Osa:</b>&nbsp;{props.part} - harjoituksia:&nbsp;{props.exercises}
    </p>
    </div>
  )
  }

// -----------------------------------------------------------
// --- Tehtävien yhteismäärä
// -----------------------------------------------------------
const Total = (props) => {
  return (
    <div>
      <p>
        <b>Yhteensä:</b>&nbsp;{props.parts[0].exercises +
                                props.parts[1].exercises +
                                props.parts[2].exercises}&nbsp;harjoitusta
        <br/>
      </p>
    </div>
  )
}

// -----------------------------------------------------------
// --- App komponentti
// --- Kurssi ja sen osat Javascript-olioiksi
// --- 1) sisältää datan
// --- 2) kutsuu muita komponentteja parametrien välityksellä
// -----------------------------------------------------------
const App = () => {

  // --- Kurssiolio
  const course = {
    name: 'Half Stack -sovelluskehitys',
    parts: [
      {
        name: 'Reactin perusteet',
        exercises: 10
      },
      {
        name: 'Tiedonvälitys propseilla',
        exercises: 7
      },
      {
        name: 'Komponenttien tila',
        exercises: 14
      }
    ]
  }

  // --- Kutsut komponentteihin
  return (
      <div>
          <Header course={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
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

