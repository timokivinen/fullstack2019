// --------------------------------------------------------------------------
// --- Tehtävä          Osa 1.12 Unicafe step 7
// --- Pvm:             12.4.2019 Timo Kivinen
// ---                  4.6.2019 (siistitty)  
// --- Aikaa käytetty:  5 h
// --------------------------------------------------------------------------
// --- Näytetään satunnainen ohjelmistotuotantoon liittyvä anekdootti
// --------------------------------------------------------------------------
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

// -----------------------------------------------------------
// --- Arvotaan kokonaisluku väliltä 0 - (props-1)
// --- Jos max(eli props) on 6, niin arvotaan lukuarvo väliltä 0-5
// --- Googlamalla löytyy
// -----------------------------------------------------------
const getRandomInt = (props) => {
  let ran = 0
  ran = Math.floor(Math.random() * Math.floor(props));
  console.log(ran)
  return ran
}

// -----------------------------------------------------------
// --- App-komponentti
// -----------------------------------------------------------
const App = (props) => {

  const [selected, setSelected] = useState(0)
  const max_value=6
  return (
    <div>
      <button onClick={() => setSelected(getRandomInt(max_value))}>
          Next anecdote 
      </button>
      <br/><br/>

      {props.anecdotes[selected]}
    </div>
  )
}
// --- End App

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

// -----------------------------------------------------------
// --- Renderöidään sivu 
// --- Parametrina anekdoottilista
// -----------------------------------------------------------
ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
