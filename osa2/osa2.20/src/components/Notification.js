// --------------------------------------------------------------
// --- Component:   Notification
// --- Purpose:     f
// --- Date:        25.5.2019 Timo Kivinen
// ---
// --------------------------------------------------------------
import React from 'react'



const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    return (
      <div className="error">
        {message}
      </div>
    )
  }

  export default Notification  