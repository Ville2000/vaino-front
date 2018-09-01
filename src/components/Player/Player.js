import React from 'react'
import './Player.css'

const Player = ({ username, removePlayer, id, isCreator, accepted, isGameCreator }) => {
  const usernameClass = `player__username${accepted ? '--accepted' : ''}`

  return (
    <div className="player">
      <div>
        {
          isCreator ?
          <small className="player__creator-title"><i>Pelin luoja</i></small> :
          <div></div>
        }
        <p className={ usernameClass }>{ username }</p>
      </div>
      {
        isGameCreator ?
        <button
          className="player__btn"
          onClick={ removePlayer(id) }>x</button> :
        <div></div>
      }
    </div>
  )
}

export default Player