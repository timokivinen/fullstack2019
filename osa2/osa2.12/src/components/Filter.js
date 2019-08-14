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
    console.log('filterzzz:', value)

    return (
            <div>Find Countries:&nbsp;&nbsp; 
                <input value={value} onChange={handleChange}/>
            </div>
    )
  }
  export default Filter
  