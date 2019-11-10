// --------------------------------------------------------------------------
// --- Tehtävä:         3.3 puhelinluettelon backend step3
// --- Pvm:             10.6.2019 Timo Kivinen
// ---                  
// --- Aikaa käytetty:  1 h
// --------------------------------------------------------------------------
// --- Node-sovellus, joka näyttää yksittäisen puhelinnumerotiedon
// --- Jos id:tä vastaavaa puhelinnumerotietoa ei ole, palautetaan statuskoodi
// --- HUOM: tämän osan tehtäväsarja kannattaa tehdä omaan git-repositorioon, 
// --- suoraan repositorion juureen! (Teht. 3.1 - 3.8)
// --------------------------------------------------------------------------
// --- Plug ins:            JSONview
// --- Projektin luonti:    npm init
// --- Express install:     npm install express --save
// --- Nodemon install:     npm install --save-dev nodemon
// --- Käynnistys:          npm start
// --- Käynnistys nodemon:  npm run watch
// --------------------------------------------------------------------------
// --- URL	      verbi     toiminnallisuus
// --- notes/10   GET	      hakee yksittäisen resurssin
// --- notes	    GET	      hakee kokoelman kaikki resurssit
// --- notes	    POST	    luo uuden resurssin pyynnön mukana olevasta datasta
// --- notes/10	  DELETE    poistaa yksilöidyn resurssin
// --- notes/10	  PUT	      korvaa yksilöidyn resurssin pyynnön mukana olevalla datalla
// --- notes/10	  PATCH	    korvaa yksilöidyn resurssin osan pyynnön mukana olevalla datalla
// --------------------------------------------------------------------------
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
    },
    {
    id: 5,
    name: "Jesse James",
    number: "040-66677766677"
    }
  ]

  // ----------------------------------------------------------
  // --- Listataan puhelinluettelo JSON-muodossa (Teht 3.1)
  // ----------------------------------------------------------
  app.get('/api/persons', (req, res) => {
    res.json(persons)
  })
  
  // ----------------------------------------------------------
  // --- Palautetaan henkilöiden lukumäärä ja kellonaika (Teht 3.2)
  // ----------------------------------------------------------
  app.get('/info', (req, res) => {

    let currTime = new Date()
    const personCount = persons.length
    
    let responseText = `Phonebook has info for ${personCount} people `
    responseText = responseText.concat(`<br/>${currTime} `)
    
    console.log(responseText)
    res.send(responseText)

  })

  // ----------------------------------------------------------
  // --- Haetaan id:tä vastaavan henkilön tiedot (Teht.3.3)
  // ----------------------------------------------------------
  app.get('/api/persons/:id', (req, res) => {
    
    // --- Muutetaan samaksi tyypiksi, jotta voidaan vertailla
    const id = Number(req.params.id)

    const person = persons.find(person => person.id === id)
    if (person) {
        res.json(person)
    } 
    else {
        res.status(404).end()      // Ei löytynyt
    }
  })

  // ----------------------------------------------------------
  // --- Kuunnellaan porttia
  // ----------------------------------------------------------
  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`***Server running on port ${PORT}`)
  })


