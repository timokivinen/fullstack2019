// -----------------------------------------------------------
// --- Tehtävä          2.1: kurssitiedot step6
// --- Pvm:             24.4.2019 Timo Kivinen
// ---                  5.6.2019 (siistitty)  
// --- Aikaa käytetty:  8 h
// -----------------------------------------------------------
// --- npm start
// -----------------------------------------------------------
import React from 'react'
import ReactDOM from 'react-dom'

// -----------------------------------------------------------
// --- Course: Kurssi-komponentti 
// -----------------------------------------------------------
const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
    </div>
  )
}

// -----------------------------------------------------------
// --- Header: Kurssien nimen muotoilu 
// -----------------------------------------------------------
const Header = ({course}) => {
  // --- console.log('****header:', props)
  // --- console.log('****header:', course)
  return (
  <div>
    <h2>
    <p> 
      {course}
    </p>
    </h2>
  </div>
  )
}

// --------------------------------------------------------------
// --- Content: Kurssien osat ja tehtävämäärät.
// --- Käytetään map-komentoa.
// --- Syötetään Part-komponentille kurssin osa kerrallaan(part).
// --- Part-komponentti palauttaa muotoillun rivin kullekin 
// ---    kurssin osalle.
// -------------------------------------------------------------- 
const Content = ({parts}) => {
  console.log('****Content:', parts)
  const rows = () => parts.map(part =>
    <Part
      key={part.id}
      name={part.name}
      exercises={part.exercises}
    />
  )
  return (
    <div>
      {rows()}
    </div>
  )
}

// -----------------------------------------------------------
// --- Part
// --- Renderöidään kurssin osan nimi ja sen tehtävämäärä
// --- Content-komponentti tarjoaa yhden part-rivin kerrallaan
// -----------------------------------------------------------
const Part = (props) => {
  return (
    <li>
      {props.name}: &nbsp;&nbsp;{props.exercises}
    </li>
  )
}

// -----------------------------------------------------------
// --- App komponentti
// --- 1) sisältää datan
// --- 2) kutsuu muita komponentteja parametrien välityksellä
// -----------------------------------------------------------
const App = () => {
  // --- Määrittelyt: Olion kaltainen rakenne
  const course = {
    name: 'Half Stack -sovelluskehitys',
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
      },
      {
        name: 'Opi oikein',
        exercises: 6,
        id: 5
      },
      {
        name: 'Full Stack!',
        exercises: 7,
        id: 6
      }

    ]
  }

  // --- Kutsut komponentteihin
  return (
    <div>
      <Course course={course} />
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
