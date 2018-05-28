import React from 'react'
import './NotFound.css'
import history from '../services/history'

const NotFound = () => {
  return (
    <div className="not-found">
      <h2 className="not-found_header">Hupsista!</h2>
      <div className="not-found_content">
        <p>Taisit eksyä...</p>
        <p>Tästä pääset kuitenkin takaisin!</p>
      </div>
      <button onClick={() => history.push('/')}>Etusivulle</button>
    </div>
  )
}

export default NotFound