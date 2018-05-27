import React from 'react'
import './NotFound.css'

const NotFound = () => {
  return (
    <div className="not-found">
      <h2 className="not-found_header">Hupsista!</h2>
      <div className="not-found_content">
        <p>Taisit eksyä...</p>
        <p>Tästä pääset kuitenkin takaisin!</p>
      </div>
      <button onClick={() => window.location.pathname = "/"}>Etusivulle</button>
    </div>
  )
}

export default NotFound