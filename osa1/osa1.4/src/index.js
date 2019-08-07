// -----------------------------------------------------------
// --- Tehtävä          1.4: kurssitiedot, step4
// --- Pvm:             6.4.2019 Timo Kivinen
// ---                  4.6.2019 (siistitty)  
// --- Aikaa käytetty:  8 h
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
        <b>Course:</b>&nbsp;&nbsp;{props.course}
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
        <Part part={props.parts[0].name} exercises={props.parts[0].exercises}/>
        <Part part={props.parts[1].name} exercises={props.parts[1].exercises}/>
        <Part part={props.parts[2].name} exercises={props.parts[2].exercises}/>
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
      <b>Part:</b>&nbsp;{props.part} - exercises: {props.exercises}
    </p>
    </div>
  )
}
// -----------------------------------------------------------
// --- Tehtävien yhteismäärä
// -----------------------------------------------------------
const Total = (props) => {
  
  // console.log('***' , props.parts[2].exercises)

  return (
    <div>
      <p>
        <b>Total:</b>&nbsp;{ props.parts[0].exercises + 
                                props.parts[1].exercises + 
                                props.parts[2].exercises}&nbsp;exercises
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
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  //  --- Kutsut komponentteihin
  return (
    <div>
      <Header course={course} />
    
      <Content parts={parts} />

      <Total parts={parts} />

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

