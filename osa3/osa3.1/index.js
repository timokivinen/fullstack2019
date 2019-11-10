// --------------------------------------------------------------------------
// --- Tehtävä:         3.1 puhelinluettelon backend step1
// --- Pvm:             10.6.2019 Timo Kivinen
// ---                  
// --- Aikaa käytetty:  2 h
// --------------------------------------------------------------------------
// --- Node-sovellus, joka tarjoaa kovakoodatun taulukon puhelinnumerotietoja
// --------------------------------------------------------------------------
// --- HUOM: tämän osan tehtäväsarja kannattaa tehdä omaan git-repositorioon, 
// --- suoraan repositorion juureen! (Teht. 3.1 - 3.8)
// --- Plug ins:            JSONview
// --- Projektin luonti:    npm init
// --- Express install:     npm install express --save
// --- Nodemon install:      npm install --save-dev nodemon
// --- Käynnistys:          npm start
// --- Käynnistys nodemon:  npm run watch
// --------------------------------------------------------------------------
// ------------------------------------------------------------------ 
// 3.1 puhelinluettelon backend step1
// --- URL	      verbi	  toiminnallisuus
// --- notes/10   GET	    hakee yksittäisen resurssin
// --- notes	    GET	    hakee kokoelman kaikki resurssit
// --- notes	    POST	  luo uuden resurssin pyynnön mukana olevasta datasta
// --- notes/10	  DELETE  poistaa yksilöidyn resurssin
// --- notes/10	  PUT	    korvaa yksilöidyn resurssin pyynnön mukana olevalla datalla
// --- notes/10	  PATCH	  korvaa yksilöidyn resurssin osan pyynnön mukana olevalla datalla
// ------------------------------------------------------------------

const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json())

// -----------------------------------------------------------
  let persons = [
    {
    id: 1,
    name: "Arto Hellas",
    number: "040-12345678"
    },
    {
    id: 2,
    name: "Jaakko Javanainen",
    number: "050-5656567"
    },
    {
    id: 3,
    name: "Jorma Käteinen",
    number: "045-66778899"
    },
    {
    id: 4,
    name: "Kauko Näköinen",
    number: "045-1122112211"
    }
  ]
  // ----------------------------------------------------------
  // --- Listataan puhelinluettelo JSON-muodossa
  // ----------------------------------------------------------
  app.get('/api/persons', (req, res) => {
    res.json(persons)
  })
  
  // ----------------------------------------------------------
  // ---
  // ----------------------------------------------------------
  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`***Server running on port ${PORT}`)
  })

