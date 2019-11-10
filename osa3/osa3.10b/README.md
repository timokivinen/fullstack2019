// --- 18.6.2019 Timo Kivinen
// --- Heroku app: 

29.8.2019:
https://pure-oasis-96960.herokuapp.com/api/persons

// --- App info
GET /api/info

// --- List persons
GET /api/persons

// --- Fetch specific person info
GET /api/persons/2

// --- Delete a person
DELETE /api/persons/5

// --- Add a new person (Use Postman or VS Code REST Client)
POST /api/persons
Content-Type: application/json

{
    "name": "Esko vaa 99",
    "number": "123456789",
    "important": false
}

