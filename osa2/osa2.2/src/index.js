// --------------------------------------------------------------------------
// --- Tehtävä          2.2: kurssitiedot step7
// --- Pvm:             27.4.2019 Timo Kivinen
// ---                  5.6.2019 (siistitty)  
// --- Aikaa käytetty:  10 h
// --------------------------------------------------------------------------
// --- Ilmoita myös kurssin yhteenlaskettu tehtävien lukumäärä
// --- 
// --------------------------------------------------------------------------
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

// -----------------------------------------------------------
// --- Kurssi-komponentti 
// -----------------------------------------------------------
const Course = ({course}) => {
  console.log('============COURSE:')

  const [course_total, setCount] = useState(0)
  
  // --- Mother Function
  const functionA = (p) => 
  {
    setCount(p)

  }
  return (
    <div>
      <Header course={course.name} />
      <Content
          parts={course.parts} 
          motherFunction={functionA}
      />
      <Total total={course_total}/>
    </div>
  )
}

// -----------------------------------------------------------
// --- Kurssien nimen muotoilu 
// -----------------------------------------------------------
const Header = ({course}) => {
  console.log('--HEADER:')
  return (
    <div>
      <h2>
        <p>{course}</p>
      </h2>
    </div>
  )
}
// const Header = props =>
//  <h1>{props.course}</h1>

// --------------------------------------------------------------
// --- Kurssien osat ja tehtävämäärät NEW
// --- Käytetään map-komentoa
// --- Syötetään Part-komponentille kurssin osa kerrallaan(part)
// --- Part-komponentti palauttaa muotoillun rivin kullekin 
// ---    kurssin osalle
// -------------------------------------------------------------- 
const Content = (props) => {
  console.log('****Content:', props)
  let exercise_count = 0

  // --- Välitetään isäntäkomponentille tähän asti
  // --- käsiteltyjen osien harjoitusten lukumäärä
  const functionB = (p) => 
  {
    exercise_count += p
    props.motherFunction(exercise_count)
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
// --- Part
// --- Renderöidään kurssin osan nimi ja sen tehtävämäärä
// --- Content-komponentti tarjoaa yhden part-rivin kerrallaan
// --- Palautetaan tämän osan tehtävämäärä 
// --  Yritetään matkia: https://github.com/fullstack-hy2019/misc/blob/master/esimerkkivastauksia.md
// -----------------------------------------------------------
const Part = (props) => {
  console.log('****PART**:')
  // --- välitetään isäntäkomponentille käsiteltävän osan harjoituksen lukumäärä
  props.motherFunction(props.exercises)
  return (
    <li>
      {props.name} &nbsp; {props.exercises}
    </li>
  )
}

// -----------------------------------------------------------
// --- Total: Tehtävien yhteismäärä
// -----------------------------------------------------------
const Total = ({total}) => {
   console.log('****Total**:', total)
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
        exercises: 1,
        id: 1
      },
      {
        name: 'Tiedonvälitys propseilla',
        exercises: 7,
        id: 2
      },
      {
        name: 'Komponenttien tila',
        exercises: 4,
        id: 3
      },
      {
        name: 'HUBBA BUBBA',
        exercises: 2,
        id: 4
      },
      {
        name: 'HUBBA BUBBA2',
        exercises: 2,
        id: 5
      },
      {
        name: 'HUBBA BUBBA3',
        exercises: 2,
        id: 6
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
  