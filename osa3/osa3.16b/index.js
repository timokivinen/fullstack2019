// --------------------------------------------------------------------------
// --- Tehtävä:         3.16: puhelinluettelo ja tietokanta, step3
// --- Pvm:             24.8.2019 Timo Kivinen
// ---                  BACKEND, FrontEnd = 3.15f
// --- Aikaa käytetty:  2 h
// --------------------------------------------------------------------------
// --- Keskitä sovelluksen virheidenkäsittely middlewareen.
// --- Routet oikeassa järjestyksessä.
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

// ----------------------------------------------------------
// --- Morgan is here
// --- Morgan tiny output format is
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
// --- Listataan puhelinluettelo JSON-muodossa 
// ----------------------------------------------------------
app.get('/api/persons', (req, res) => {
  console.log(`#---- Phonebook:`)
  Person
    .find({}).then(people => {
    res.json(people)
    
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
  // --- Haetaan id:tä vastaavan henkilön tiedot (Teht 3.13)
  // ----------------------------------------------------------
  app.get('/api/persons/:id', (req, res, next) => {

    // --- Muutetaan samaksi tyypiksi, jotta voidaan vertailla
    // const id = Number(req.params.id)

    Person.findById(req.params.id)
      .then(person => {
        if (person) {
          res.json(person.toJSON())
        } else {
          res.status(404).end() 
        }
      })
      .catch(error => next(error))
  })

  // ----------------------------------------------------------
  // --- Poisto / DELETE (Teht 3.15)
  // ----------------------------------------------------------
  app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
      .then(result => {
        res.status(204).end()
      })
      .catch(error => next(error))
  })

  // ----------------------------------------------------------
  // --- Käytetään spread-syntaksia: taulukko yksittäisiksi luvuiksi
  // --- Jos rivejä olemassa, niin maksimi id +100
  // ----------------------------------------------------------
  const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
    return maxId + 100
  }
  
  // ----------------------------------------------------------
  // --- Lisäys / POST (Teht 3.14)
  // --- Body-parser käytössä
  // ----------------------------------------------------------
  app.post('/api/persons', (req, res, next) => {
    
    //console.log("**", req.body, "**")
    //console.log(req.headers)
    let errMessage  = ""

    if (!req.body.name) {       // --- Nimi puuttuu
        errMessage = "{'Name is mandatory'}"
    }
    if (!req.body.number) {     // --- Puhelinnumero puuttuu
        errMessage = "{'Number is mandatory'}"
    }
  
    if (errMessage) {
        console.log(`${errMessage}. Nimi: ${req.body.name} Numero: ${req.body.number} \n`)
		throw new Error(errMessage)
        // res.write(`${errMessage}`)
        //res.end('')
        //return 0
    }

    // --- EI VÄLITETÄ TUPLARIVEISTÄ!

    // --- Lisätään rivi tietokantaan
    const person = new Person({
      name: req.body.name,
      number: req.body.number,
      id: generateId()
    })
	// .catch(error => next(error))
	
    person.save().then(savedPerson => {
      res.json(savedPerson.toJSON())
    })
	.catch(error => next(error))
	
  })

  // ----------------------------------------------------------
  // --- Unknown enpoint resides after routes
  // --- Olemattomien osoitteiden käsittely
  // ----------------------------------------------------------
  const unknownEndpoint = (request, response) => {
      response.status(404).send({ error: 'unknown endpoint' })
  }
  app.use(unknownEndpoint)

  // --------------------------------------------------------------------
  // --- virheellisten pyyntöjen käsittely (Teht. 3.16)
  // --------------------------------------------------------------------
  const errorHandler = (error, req, res, next) => {
	console.log('------------- ERROR HANDLER')
	console.log('msg:', error.message, '---')
	
    //--- Wrong type of id
    if (error.name === 'CastError' && error.kind == 'ObjectId') {
      return res.status(400).send({ error: 'malformatted id' })
    } 
	
    next(error)
  }
  app.use(errorHandler)
  
  // ----------------------------------------------------------
  // --- Kuunnellaan Porttia
  // ----------------------------------------------------------
  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`***Server running on port ${PORT}`)
  })
