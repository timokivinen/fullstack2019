// --------------------------------------------------------------------------
// --- Tehtävä          2.5: Kurssitiedot, erillinen moduuli
// --- Pvm:             29.4.2019 Timo Kivinen
// ---                  4.6.2019 (siistitty)  
// --------------------------------------------------------------------------
import React, { useState } from 'react'
// import ReactDOM from 'react-dom'

// -----------------------------------------------------------
// --- Kurssit-komponentti 
// -----------------------------------------------------------
const Courses = ({courses}) => {

  const rows = () => courses.map(course =>
    <Course
      key={course.id}
      course={course}
    />
  )
  return (
    <div>
       {rows()}
    </div>
  )
}

// -----------------------------------------------------------
// --- Kurssi-komponentti 
// -----------------------------------------------------------
const Course = ({course}) => {
  // -- Tähän taulukkoon lisätään eri osien harjoitusten lukumäärät
  let  array1 = []  

  // --- Content-komponetti palauttaa tänne excercise-määrän
  const functionA = (p) =>
  {
    array1.push(p)
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
// --- Kurssien nimen muotoilu 
// -----------------------------------------------------------
const Header = ({course}) => {
  // --- console.log('****header:', course)
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
    // --- console.log('****Content:', parts)

    // --- välitetään isäntäkomponentille tähän asti
    // --- käsiteltyjen osien harjoitusten lukumäärä
    const functionB = (p) => 
    {
      // partcount += p
      // -- console.log('PARTCOUNT:', partcount)
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
// --- Käytetään kätevää reduce-funktiota(sinne meni pääsiäisloma..)
// -----------------------------------------------------------
const Total = ({eArray}) => {
  // --- Ynnätään taulukon alkiot
  const total = eArray.reduce( (s, p) => {
    return s+p
  })
  
  // console.log('****Total**:', eArray)
  return (
    <div>
      <p>
        Yhteensä:&nbsp;{total} harjoitusta
      </p>
    </div>
  )

}
export default Courses