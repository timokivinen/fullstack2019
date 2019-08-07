// --------------------------------------------------------------------------
// --- Tehtävä          Osa 1.14* Anekdootit step 3
// --- Pvm:             21.4.2019 Timo Kivinen
// ---                  4.6.2019 (siistitty)  
// --- Aikaa käytetty:  2 h
// --------------------------------------------------------------------------
// --- Näytettävää anekdoottia on mahdollista äänestää.
// --- Näyttää eniten ääniä saaneen anekdootin.
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
// --- eniten ääniä saanut anekdootti
// -----------------------------------------------------------
const MostVotes = (props) => {
    console.log('**** MostVotes: ', props.most)

    // --- Etsi ensimmäinen vastaantuleva alkio, jonka arvo on props.vote 
    // --- voteInd on alkion indeksi
    const voteInd = voteArray.findIndex(k => k===props.most)
    console.log('**** voteInd: ', voteInd)
    return (
        <div>
        <h1>
            <p>
                Anecdote with the most votes
            </p>
            {anecdotes[voteInd]}
            <p>
                has {voteArray[voteInd]} votes
            </p>
        </h1>
        </div>
      )
  }
  

// -----------------------------------------------------------
// --- 
// --- AdVote-komponentti on kytketty setIndex-tilaan. 
// --- (En saanut muutoin sivua renderöitymään heti... )
// -----------------------------------------------------------
const App = (props) => {

  const [selected, setSelected] = useState(0)
  const [votecount, setIndex] = useState(0)

//  voteArray[0] += 1

  return (
      <div>
          <br/>
          <h1> Anecdote of the day</h1>
          {anecdotes[selected]}

          <Votes votes={voteArray[selected]} />

          <br/><br/>
          <button onClick={() => setIndex(AddVote(selected))}>
              Vote 
          </button>
          &nbsp;&nbsp;
          <button onClick={() => setSelected(getRandomInt(max_value))}>
              Next anecdote 
          </button>

            {
            // ---------------------------------------------------- 
            // --- ECMAScript 2015 style array
            // ----------------------------------------------------
            }
          <MostVotes most={Math.max(...voteArray)} />

          

          <br/><br/>
            {voteArray[0]}-
            {voteArray[1]}-
            {voteArray[2]}-
            {voteArray[3]}-
            {voteArray[4]}-
            {voteArray[5]}
        
      </div>
  )
}

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


ReactDOM.render(
  <App anecdotes={anecdotes} />, document.getElementById('root')
)

