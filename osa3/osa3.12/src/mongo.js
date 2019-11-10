// --------------------------------------------------------------------------
// --- Tehtävä          3.12: tietokanta komentoriviltä
// --- Pvm:             25.6.2019 Timo Kivinen
// ---                  
// --- Aikaa käytetty:  5 h
// --------------------------------------------------------------------------
// --- Projektin luonti:    npm init
// ---                      npm install mongoose --save 
// --------------------------------------------------------------------------
// --- 1) Back end:         app.use(express.static('build'))
// --- 2) Front end:        baseUrl = /aaa/bbb
// --- 3) Production build  npm run build (Front End)
// --- 4) Copy frontend Build dir to backend dir
// --- 5) Test local        localhost:3001  (npm start back end)
// --- 5) Back End          git init, git add build..., git commit, git push heroku master
// --- https://mysterious-scrubland-61877.herokuapp.com/
// --------------------------------------------------------------------------
// --- git add .gitignore build index.js package-lock.json package.json Procfile requests
// --- pw: tjkfff55A
const mongoose = require('mongoose')
// --------------------------------------------------------------------
// --- Syntax: node mongo.js password "firstname lastname" phonenumber
// --------------------------------------------------------------------
console.log('argv.len', process.argv.length)

// --------------------------------------------------------------------
// --- Mongo Db
// --------------------------------------------------------------------
const person_password = process.argv[2]
const person_name = process.argv[3]
const person_number = process.argv[4]

const url =
`mongodb+srv://fullstack:${person_password}@cluster0-d6pl0.mongodb.net/person?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const noteSchema = new mongoose.Schema({
  name: String,
  number: String
//  number: Number
})
const Person = mongoose.model('Person', noteSchema)

if ( process.argv.length == 3 ) {
    // --------------------------------------------------------------------
    // --- LISTATAAN HENKILÖT
    // --------------------------------------------------------------------
    console.log(`---- Phonebook:`)
    Person
      .find({})
      .then(result => {
        result.forEach(person => {
        console.log(person.name, '  ', person.number)
      })
      mongoose.connection.close()
    })
}
else 
  if ( process.argv.length == 5 ) {
    // --------------------------------------------------------------------
    // --- LISÄTÄÄN UUSI HENKILÖ
    // --------------------------------------------------------------------
    // --- console.log(`0: ${process.argv[0]} 1: ${process.argv[1]} 2: ${process.argv[2]} 3: ${process.argv[3]} 4: ${process.argv[4]}`)

    // --------------------------------------------------------------------
    // --- Lisätään uusi rivi
    // --------------------------------------------------------------------
    const person = new Person({
      name:   person_name,
      number: person_number
    })

    person.save().then(response => {
      console.log(`Added ${person_name}, number ${person_number} to the phonebook. `)
      mongoose.connection.close()
    })
  }  // -- end if
  else {
    console.log('Syntax: node mongo.js password "firstname lastname" phonenumber')
    console.log('Syntax: node mongo.js password ')
    process.exit(1)
  }
