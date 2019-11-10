// --------------------------------------------------------------------------
// --- Tehtävä:         3.14: puhelinluettelo ja tietokanta, step2
// --- Pvm:             20.8.2019 Timo Kivinen
// --- FronEnd:         3.13f
// --- Aikaa käytetty:  4 h
// --------------------------------------------------------------------------
// --- Uudet numerot tallennetaan tietokantaan
// --------------------------------------------------------------------------
// --- Plug ins:            JSONview
// --- Projektin luonti:    npm init
// --- Express install:     npm install express --save
// --- Nodemon install:     npm install --save-dev nodemon
// --- Morgan install:      npm install morgan
// --- Mongoose install:    npm install mongoose --save 
// --- Cors install:        npm install cors --save
// --- Käynnistys:          npm start/ node index.js password
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
const Person = require('./models/person')

const express = require('express')
const morgan = require('morgan')
const app = express()

const bodyParser = require('body-parser')
// -- Ilman body-parseria body arvo on undefined
// -- Parser muuttaa pyynnön JSON-muotoisen datan ja muuttaa
// --- sen Javascript-olioksi (==> request.body)
app.use(bodyParser.json())

// --- minimal output: :method :url :status :res[content-length] - :response-time ms
// app.use(morgan('tiny'))
app.use(morgan('combined'))

const cors = require('cors')
app.use(cors())

// --------------------------------------------------------------------
// --- Mongo Db params
// --------------------------------------------------------------------
const person_password = process.argv[2]
const person_name = process.argv[3]
const person_number = process.argv[4]
console.log('argv.len', process.argv.length)

let maxPersonId = 1
// ----------------------------------------------------------
// --- Morgan middleware                      (Teht. 3.8)
// --- :method :url :status :res[content-length] - :response-time ms
// ----------------------------------------------------------
morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
  var loggerFormat = 'logger: :method :url :status :res[content-length] - :response-time ms :body '
  app.use(morgan(loggerFormat, {
    skip: function (req, res) {
      return res.statusCode >= 400
    },
  stream: process.stdout
}))


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
// --- Haetaan puhelintiedot tietokannasta      (Teht 3.13)
// ----------------------------------------------------------
app.get('/api/persons', (req, res) => {
  console.log(`------------------ LIST PERSONS /api/persons`)
  Person
    .find({}).then(people => {
    res.json(people)
    // --- Generoidaan seuraava id 
    generateId()
    // mongoose.connection.close()
  })
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
// --- Muodostetaan uusi id-avain             (Teht 3.14)
// --- Tätä funktiota kutsutaan listauksen yhteydessä: route: '/api/persons'
// --- ja lisäyksen jälkeen
// ----------------------------------------------------------
const generateId = () => {
  let maxId = ''
  // --- haetaan max(id). Tuloksena yksi alkio(limit=1)
  Person.find({}).sort({id:-1}).limit(1).then(maxPerson => {
    maxId = maxPerson.map(mPerson => mPerson.id)
    maxPersonId = Number(maxId) + 100   // --- Globaali muuttuja
  })    
}

// ----------------------------------------------------------
// --- Lisäys / POST (Teht 3.14)
// ----------------------------------------------------------
app.post('/api/persons', (req, res) => {
// --- EI VÄLITETÄ TUPLARIVEISTÄ!
  console.log('------------------ POST1 ')
  if (req.body === undefined) {
    return res.status(400).json({ error: 'content missing' })
  }
  console.log('------------------ POST2 ')
  // --- Lisätään rivi tietokantaan
  const person = new Person({
    id: maxPersonId,
    name: req.body.name,
    number: req.body.number    
  })
  console.log('------------------ POST3 ')
  person.save().then(savedPerson => {
    // --- Generoidaan seuraava id 
    generateId()
    res.json(savedPerson.toJSON())
  })
  console.log('------------------ POST4 ')
})

// ----------------------------------------------------------
// --- Unknown enpoint resides after routes
// ----------------------------------------------------------
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

// ----------------------------------------------------------
// --- Kuunnellaan Porttia
// ----------------------------------------------------------
const PORT = 3001
app.listen(PORT, () => {
  console.log(`***Server running on port ${PORT}`)
})
