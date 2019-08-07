// -----------------------------------------------------------
// --- Tehtävä          1.1: kurssitiedot, step1
// --- Pvm:             20.3.2019 Timo Kivinen
// ---                  4.6.2019 (siistitty)  
// --- Aikaa käytetty:  5 h
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
      <p>
        <b>Osa:</b>&nbsp;&nbsp;{props.part} <b>- harjoituksia:</b> {props.exercises}
        <br/>
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
        <b>Yhteensä:</b>&nbsp;&nbsp;{props.total} harjoitusta
        <br/>
      </p>
    </div>
  )
}

// -----------------------------------------------------------
// --- App komponentti
// --- 1) sisältää datan
// --- 2) kutsuu muita komponentteja parametrien välityksellä
// -----------------------------------------------------------
const App = () => {
  // --- const-määrittelyt
  const course = 'Half Stack -sovelluskehitys'
  const part1 = 'Reactin perusteet'
  const exercises1 = 10
  const part2 = 'Tiedonvälitys propseilla'
  const exercises2 = 7
  const part3 = 'Komponenttien tila'
  const exercises3 = 14

//  --- Kutsut komponentteihin
  return (
    <div>
      <Header course={course} />
    
      <Content part={part1} exercises={exercises1} />
      <Content part={part2} exercises={exercises2} />
      <Content part={part3} exercises={exercises3} />

      <Total total={exercises1 + exercises2 + exercises3} />
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
