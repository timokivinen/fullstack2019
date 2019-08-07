// -----------------------------------------------------------
// --- Tehtävä          1.3: kurssitiedot, step3
// --- Pvm:             21.3.2019 Timo Kivinen
// ---                  4.6.2019 (siistitty)  
// --- Aikaa käytetty:  3 h
// -----------------------------------------------------------

import React from 'react'
import ReactDOM from 'react-dom'

// -----------------------------------------------------------
// --- Kurssien nimien muotoilu (renderöinti)
// -----------------------------------------------------------
const Header = (props) => {
  console.log(props)
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
      <Part part={props.part1.name} exercises={props.part1.exercises} />
      <Part part={props.part2.name} exercises={props.part2.exercises} />
      <Part part={props.part3.name} exercises={props.part3.exercises} />
      <br/>
      </p>
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
        <b>Osa:</b>&nbsp;{props.part} - harjoituksia: {props.exercises}
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
        <b>Yhteensä:</b>&nbsp;{props.total} harjoitusta
        <br/>
      </p>
    </div>
  )
}

// -----------------------------------------------------------
// --- App komponentti
// --- Käytetään kurssi-olioita
// --- 1) sisältää datan
// --- 2) kutsuu muita komponentteja parametrien välityksellä
// -----------------------------------------------------------
const App = () => {
// --- const-määrittelyt
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

//  --- Kutsut komponentteihin
  return (
    <div>
      <Header course={course} />
    
      <Content part1={part1} part2={part2} part3={part3} />
      <Total total={part1.exercises + part2.exercises + part3.exercises} />

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

