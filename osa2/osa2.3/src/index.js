// -----------------------------------------------------------
// --- Tehtävä          2.3: kurssitiedot, step8 ok
// --- Pvm:             27.4.2019 Timo Kivinen
// ---                  4.6.2019 (siistitty)  
// --- Aikaa käytetty:  4 h
// -----------------------------------------------------------
// --- Ilmoita kurssin yhteenlaskettu tehtävien lukumäärä
// --- ja laske tehtävien määrä taulukon metodilla reduce.
// --- 
// -----------------------------------------------------------
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

// -----------------------------------------------------------
// --- Course: Kurssi-komponentti 
// -----------------------------------------------------------
const Course = ({course}) => {
  // -- Taulukkoon lisätään eri osien harjoitusten lukumäärät
  let  array1 = []  

  // --- Content-komponetti palauttaa tänne excercises-arvon
  const functionA = (p) =>
  {
    array1.push(p)
    console.log('arr:', array1)
  }

  return (
    <div>
      <Header course={course.name} />
      <Content
          parts={course.parts} 
          motherFunction={functionA}
      />
      <Total eArray={array1}/>
    </div>
  )
}

// -----------------------------------------------------------
// --- Header: Kurssin nimen muotoilu
// -----------------------------------------------------------
const Header = ({course}) => {
  return (
    <div>
      <h2>
        <p>{course}</p>
      </h2>
    </div>
  )
}

// --------------------------------------------------------------
// --- Kurssien osat ja tehtävämäärät 
// --- Käytetään map-komentoa
// --- Syötetään Part-komponentille kurssin osa kerrallaan(part)
// --- Part-komponentti palauttaa muotoillun rivin kullekin 
// ---    kurssin osalle
// -------------------------------------------------------------- 
const Content = (props) => {
  console.log('****Content:')
  
  // --- välitetään isäntäkomponentille tähän asti
  // --- käsiteltyjen osien harjoitusten lukumäärä
  const functionB = (p) => 
  {
    props.motherFunction(p)
  }

  const rows = () => props.parts.map(part =>
    <Part
      key={part.id}
      name={part.name}
      exercises={part.exercises}
      motherFunction={functionB}
    />
    )

  return (
      <div>
          {rows()}
      </div>
  )
}
 
// -----------------------------------------------------------
// --- Renderöidään kurssin osan nimi ja sen tehtävämäärä
// --- Content-komponentti tarjoaa yhden part-rivin kerrallaan
// --- Palautetaan tämän osan tehtävämäärä 
// --  Yritetään matkia: https://github.com/fullstack-hy2019/misc/blob/master/esimerkkivastauksia.md
// -----------------------------------------------------------
const Part = (props) => {
  // --- välitetään isäntäkomponentille käsiteltävän osan harjoitusten lukumäärä
  props.motherFunction(props.exercises)
  return (
    <li>
      {props.name} &nbsp;&nbsp; {props.exercises}
    </li>
  )
}

// -----------------------------------------------------------
// --- Tehtävien yhteismäärä
// --- Käytetään reduce-funktiota
// -----------------------------------------------------------
const Total = ({eArray}) => {

  // --- Ynnätään taulukon alkiot
  const total = eArray.reduce( (s, p) => {
    return s+p
  })
  
  console.log('****Total**:', eArray)
  return (
    <div>
      <p>
        Yhteensä:&nbsp;{total} harjoitusta
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

  // --- Määrittelyt: Olion kaltainen rakenne
  const course = {
    name: 'Half Stack -sovelluskehitys',
    parts: [
      {
        name: 'Reactin perusteet',
        exercises: 3,
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
        name: 'HUBBA BUBBA',
        exercises: 1,
        id: 4
      }
    ]
  }

  // -----------------------------------------------------------  
  // --- Kutsut komponentteihin
  // --- <Total total={excercise_total} />
  // ----------------------------------------------------------- 
  return (
    <div>
      <Course course={course}/>
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
  