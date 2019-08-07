// --------------------------------------------------------------------------
// --- Tehtävä          Osa 1.13* Anekdootit step 2
// --- Pvm:             21.4.2019 Timo Kivinen
// ---                  4.6.2019 (siistitty)  
// --- Aikaa käytetty:  5 h
// --------------------------------------------------------------------------
// --- Näytettävää anekdoottia on mahdollista äänestää
// --- TODO: AddVote-napin toiminto epäselvä
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
  
  console.log('@@@getRandomInt: ', ran)
  return ran
}


// -----------------------------------------------------------
// --- Äänien yhteismäärä
// -----------------------------------------------------------
const Votes = (props) => {
  console.log('****:: propsin arvo on', props)
  return (
    <div>
      <p>
        This has&nbsp;{props.votes} votes
        <br/>
      </p>
    </div>
  )
}
// -----------------------------------------------------------
// --- Lisää ääni
// -----------------------------------------------------------
const AddVote = (props) => {
  console.log('**** propsin arvo on', props)
  voteArray[props] +=1

  return voteArray[props]
}

// -----------------------------------------------------------
// --- App-komponentti
// --- AdVote-komponentti on kytketty setIndex-tilaan. 
// --- (En saanut muutoin sivua renderöitymään heti... )
// -----------------------------------------------------------
const App = (props) => {

  const [selected, setSelected] = useState(0)
  const [votecount, setIndex] = useState(0)

  return (
    <div>
      <button onClick={() => setIndex(AddVote(selected))}>
          Vote 
      </button>
      &nbsp;&nbsp;
      <button onClick={() => setSelected(getRandomInt(max_value))}>
          Next anecdote 
      </button>

      <br/><br/>
      {anecdotes[selected]}

      <br/><br/>
      <Votes votes={voteArray[selected]} />

      {voteArray[0]}-
      {voteArray[1]}-
      {voteArray[2]}-
      {voteArray[3]}-
      {voteArray[4]}-
      {voteArray[5]}
      
    </div>
  )
}
// --- App

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const max_value = 6
const voteArray = Array.apply(null, new Array(6)).map(Number.prototype.valueOf,0);
// --- Output [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]


// -----------------------------------------------------------
// --- Renderöidään sivu 
// --- Parametrina anekdoottilista
// -----------------------------------------------------------
ReactDOM.render(
  <App anecdotes={anecdotes} />, document.getElementById('root')
)
