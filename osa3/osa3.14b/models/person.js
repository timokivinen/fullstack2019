// --------------------------------------------------------------------------
// --- Moduli:          persons.js
// --- Tehtävä:         Tietokantamäärittelyt
// --- Pvm:             20.8.2019 Timo Kivinen
// ---                  Lisätty id-kenttä skeemaan
// --------------------------------------------------------------------------

// -----------------------------------------------------------
// --- Mongoose
// -----------------------------------------------------------
const mongoose = require('mongoose')
// --------------------------------------------------------------------
// --- Syntax: node mongo.js password "firstname lastname" phonenumber
// --------------------------------------------------------------------
const person_password = process.argv[2]
// const url = process.env.MONGODB_URI
const url =
`mongodb+srv://fullstack:${person_password}@cluster0-d6pl0.mongodb.net/person?retryWrites=true&w=majority`

console.log('Connecting to ', url)

mongoose.connect(url, { useNewUrlParser: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  id:   Number,
  name: String,
  number: String
})
const Person = mongoose.model('Person', personSchema)

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Person', personSchema)