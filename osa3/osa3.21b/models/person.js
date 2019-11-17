// --------------------------------------------------------------------------
// --- Moduli:          persons.js
// --- Tehtävä:         Tietokantamäärittelyt
// --- Pvm:             3.9.2019 Timo Kivinen
// ---                  Validaatiot
// --------------------------------------------------------------------------

// -----------------------------------------------------------
// --- Mongoose
// -----------------------------------------------------------
const mongoose = require('mongoose')
// --- Teht 3.19 Validaattori
const uniqueValidator = require('mongoose-unique-validator')

// --- Fix deprecation warnings
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

// --------------------------------------------------------------------
// --- Syntax: node mongo.js password "firstname lastname" phonenumber
// --------------------------------------------------------------------
const person_password = process.argv[2]
// const url = process.env.MONGODB_URI
const heroku_password='tjkfff55A'
const url =
`mongodb+srv://fullstack:${heroku_password}@cluster0-d6pl0.mongodb.net/person?retryWrites=true&w=majority`

console.log('Connecting to ', url)

mongoose.connect(url, { useNewUrlParser: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })
/*
const personSchema = new mongoose.Schema({
  id:   Number,
  name: String,
  number: String
})
*/
const personSchema = new mongoose.Schema({
    id:     { type: Number, required: true, unique: true },
    name:   { type: String, minlength: 3, required: true, unique: true },
    number: { type: String, minlength: 8, required: true }
  })
  
const Person = mongoose.model('Person', personSchema)

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

//--- Apply the uniqueValidator plugin to Schema.
personSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Person', personSchema)