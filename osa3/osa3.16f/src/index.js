// --------------------------------------------------------------------------
// --- Tehtävä          3.16f
// --- Pvm:             25.8.2019 Timo Kivinen
// ---                  
// --- Aikaa käytetty:  x h
// --------------------------------------------------------------------------
// --- Projektin luonti:    npm create react-app osa3.16f
// --- Axios install:       npm install axios
// --------------------------------------------------------------------------
// --- 1) Back end:         app.use(express.static('build'))
// --- 2) Front end:        baseUrl = /aaa/bbb
// --- 3) Production build  npm run build (Front End)
// --- 4) Copy frontend Build dir to backend dir
// --- 5) Test local        localhost:3001  (npm start back end)
// --- 5) Back End          git init, git add build..., git commit, git push heroku master
// --------------------------------------------------------------------------
// --- git add .gitignore build index.js package-lock.json package.json Procfile requests
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

