// --------------------------------------------------------------------------
// --- Tehtävä:         3.6 puhelinluettelon backend step6
// --- Pvm:             11.6.2019 Timo Kivinen
// ---                  
// --- Aikaa käytetty:  2 h
// --------------------------------------------------------------------------
// --- Virhekäsittely, jos nimi tai numero puuttuu/on jo luettelossa
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
// -- Ilman body-parseria body arvo on undefined
// -- Parser muuttaa pyynnön JSON-muotoisen datan ja muuttaa
// --- sen Javascript-olioksi (==> request.body)
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
  app.get('/api/info', (req, res) => {

    let currTime = new Date()
    const personCount = persons.length
    
    let responseText = `Phonebook has info for ${personCount} people `
    responseText = responseText.concat(`<br/>${currTime} `)
    
    console.log(responseText)
    res.send(responseText)

  })

  // ----------------------------------------------------------
  // --- Haetaan id:tä vastaavan henkilön tiedot (Teht 3.3)
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
  // --- Poisto / DELETE (Teht 3.4)
  // ----------------------------------------------------------
  app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
  })

  // ----------------------------------------------------------
  // --- Käytetään spread-syntaksia: taulukko yksittäisiksi luvuiksi
  // --- Jos rivejä olemassa, niin maksimi id +1
  // ----------------------------------------------------------
  const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
    return maxId + 100
  }
  
  // ----------------------------------------------------------
  // --- Lisäys / POST (Teht 3.5/3.6)
  // --- Body-parser käytössä
  // ----------------------------------------------------------
  app.post('/api/persons', (req, res) => {
    
    // console.log("**", req.body, "**")
    // console.log(req.headers)
    let errMessage  = ""

    if (!req.body.name) {       // --- Nimi puuttuu
        errMessage = "{ error: 'Name is mandatory.' }"
    }
    if (!req.body.number) {     // --- Puhelinnumero puuttuu
        errMessage = "{ error: 'Number is mandatory.' }"
    }
    // --- Onko tuplanimi?
    const name = persons.find(person => person.name.toUpperCase() === req.body.name.toUpperCase())
    if (name) {
        errMessage = "{ error: 'Name must be unique.' }"
    } 
    
    if (errMessage) {
        console.log(`${errMessage}. Nimi: ${req.body.name} Numero: ${req.body.number} \n`)
        res.write(`${errMessage}`)
        res.end('')
        return 0
    }

    // --- Lisätään rivi luetteloon
    const person = {
      name: req.body.name,
      number: req.body.number,
      // -- content: req.body,
      important: req.body.important || false,
      date: new Date(),
      id: generateId(),
    }        
    persons = persons.concat(person)
    res.json(person)
  })

  // ----------------------------------------------------------
  // --- Kuunnellaan porttia
  // ----------------------------------------------------------
  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`***Server running on port ${PORT}`)
  })

