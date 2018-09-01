import React from 'react'
import './PlayerSearchForm.css'

const PlayerSearchForm = ({ handleFormSubmit, handleFormInputChange, formInput }) => {
  return (
    <form
      onSubmit={handleFormSubmit}
      className="player-search-form">
      <label>Lisää pelaaja
        <input
          value={formInput}
          type="text"
          autoComplete="off"
          onChange={handleFormInputChange}
          placeholder='Lisää pelaaja'/>
      </label>
      <button className="btn btn--blue" type="submit">Lisää</button>
    </form>
  )
}

export default PlayerSearchForm