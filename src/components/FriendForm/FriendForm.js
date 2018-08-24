import React from 'react'
import './FriendForm.css'

const FriendForm = ({ username, handleUsernameChange, addFriend }) => {
  return (
    <form className="fform__container" onSubmit={addFriend}>
      <label
        className="fform__container__label"
        htmlFor="friend-name">Lisää kaveri:</label>
      <input
        className="fform__container__input"
        name="friend-name"
        type="text"
        placeholder="Kaverin käyttäjänimi"
        value={ username }
        onChange={ handleUsernameChange }
        autoComplete="off"
      />
      <button
        className="fform__container__btn"
        type="submit" >Lisää</button>
    </form>
  )
}

export default FriendForm