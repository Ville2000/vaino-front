import React from 'react'

const PlayerSearchForm = ({ handleFormSubmit, handleFormInputChange, formInput }) => {
  return (
    <form onSubmit={handleFormSubmit}>
      <input
        value={formInput}
        type="text"
        autoComplete="off"
        onChange={handleFormInputChange}
        placeholder='Etsi pelaajaa...'/>
      <button type="submit">Lisää pelaaja</button>
    </form>
  )
}

export default PlayerSearchForm