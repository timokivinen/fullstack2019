// --------------------------------------------------------------
// --- Component:   Filter
// --- Purpose:     
// --- Date:        8.5.2019 Timo Kivinen
// ---
// --------------------------------------------------------------
import React from 'react'

// ----------------------------------------------
// --- Rajaus-filtteri
// ----------------------------------------------
const Filter = ({value, handleChange}) => {
    console.log('filterzzz:', value)

    return (
            <div>Rajaa näytettäviä: 
                <input value={value} onChange={handleChange}/>
            </div>
    )
  }
  export default Filter