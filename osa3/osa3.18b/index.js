// --------------------------------------------------------------------------
// --- Tehtävä:         3.18b: puhelinluettelo ja tietokanta, step5
// --- Pvm:             24.8.2019 Timo Kivinen
// ---                  BACKEND, FrontEnd = 3.18f
// --- Aikaa käytetty:  6 h
// --------------------------------------------------------------------------
// --- api/persons/:id ja info käsittely
// --- 
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

// ----------------------------------------------------------
// --- Listataan puhelinluettelo JSON-muodossa 
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
// --- Palautetaan henkilöiden lukumäärä ja kellonaika (Teht 3.18)
// ----------------------------------------------------------
app.get('/api/info', (req, res) => {

  let personCount = 0
  let currTime = new Date()
 
  Person.find({}).then(people => {
    people.forEach(person => {
      personCount = personCount + 1
    })
    let responseText = `Phonebook has info for ${personCount} people `
    responseText = responseText.concat(`<br/>${currTime} `)
    res.send(responseText)
    mongoose.connection.close()
  })
})

// ----------------------------------------------------------
// --- Haetaan id:tä vastaavan henkilön tiedot (Teht 3.18)
// ----------------------------------------------------------
app.get('/api/persons/:id', (req, res, next) => {
  // --- Muutetaan samaksi tyypiksi, jotta voidaan vertailla
  // --- const id = Number(req.params.id)
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
// --- Muodostetaan uusi id-avain  (Teht 3.17)
// --- Tätä funktiota kutsutaan listauksen yhteydessä: route: '/api/persons'
// ----------------------------------------------------------
const generateId = () => {
  let maxId = ''
  // --- haetaan max(id). Tuloksena yksi alkio(limit=1)
  Person.find({}).sort({id:-1}).limit(1).then(maxPerson => {
    maxId = maxPerson.map(mPerson => mPerson.id)
    console.log('------------------ maxPerson: ', maxId)
    maxPersonId = Number(maxId) + 100   // --- Globaali muuttuja
    // mongoose.connection.close()
  })    
}

// ----------------------------------------------------------
// --- Lisäys / POST (Teht 3.14/3.17)
// --- Body-parser käytössä
// ----------------------------------------------------------
app.post('/api/persons', (req, res, next) => {
  console.log(`----------------------------------  POST ADD 1`)
  let errMessage  = ""

  if (!req.body.name) {       // --- Nimi puuttuu
      errMessage = "name is mandatory"
  }
  if (!req.body.number) {     // --- Puhelinnumero puuttuu
      errMessage = "number is mandatory"
  }
  // --- Palautetaan virheilmoitus
  if (errMessage) {
      console.log(`${errMessage}. Nimi: ${req.body.name} Numero: ${req.body.number} \n`)
      throw new Error(errMessage)
  }

  const person = new Person({
    name: req.body.name,
    number: req.body.number,
    id: maxPersonId     // --- Globaali muuttuja, generateId() tuottaa sen
  })

	person.save().then(savedPerson => {
    res.json(savedPerson.toJSON())
    generateId()
    })
	  .catch(error => next(error))
	})

  // ----------------------------------------------------------
  // --- MUUTOS/PUT                   (Teht. 3.17)
  // ----------------------------------------------------------
  app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body

    // --- Javascript-olio
    const person = {
      number: body.number,    //--- uusi puhnro
    }
    // --- Lisää: mongoose.set('useFindAndModify', false)
    Person.findByIdAndUpdate(req.params.id, person, { new: true })
      .then(updatedPerson => {
        res.json(updatedPerson.toJSON())
      })
      .catch(error => next(error))
  })

  // ----------------------------------------------------------
  // --- Olemattomien routejen käsittely viimeisenä
  // ----------------------------------------------------------
  const unknownEndpoint = (request, response) => {
      response.status(404).send({ error: 'unknown endpoint' })
  }
  app.use(unknownEndpoint)

  // --------------------------------------------------------------------
  // --- virheellisten pyyntöjen käsittely (Teht. 3.16)
  // --------------------------------------------------------------------
  const errorHandler = (error, req, res, next) => {
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
