// --------------------------------------------------------------------------
// --- Tehtävä          3.9 Front End. Puhelinluettelo, step9
// --- Pvm:             15.6.2019 Timo Kivinen
// ---
// --- Aikaa käytetty:  8 h
// --------------------------------------------------------------------------
// --- Backend toimimaan edellisessä osassa tehdyn puhelinluettelon frontendin 
// --- kanssa muilta osin, paitsi mahdollisen puhelinnumeron muutoksen osalta, 
// --- jonka vastaava toiminnallisuus toteutetaan backendiin vasta tehtävässä 3.1
// --- 
// ---                    npx create-react-app osa9f
// --- Axios install:     npm install axios
// --- npx json-server --port=3001 --watch db.json
// --- npm start
// --------------------------------------------------------------------------
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
