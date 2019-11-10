// --------------------------------------------------------------
// --- Component:   Filter
// --- Purpose:     f
// --- Date:        8.5.2019 Timo Kivinen
// ---
// --------------------------------------------------------------
import React from 'react'

// ----------------------------------------------
// ---
// ----------------------------------------------
const Filter = ({value, handleChange}) => {
    return (
            <div>Rajaa näytettäviä: 
                <input value={value} onChange={handleChange}/>
            </div>
    )
  }
  export default Filter