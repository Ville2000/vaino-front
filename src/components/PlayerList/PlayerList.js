import React from 'react'
import Player from '../Player/Player'
import './PlayerList.css'

const PlayerList = ({ players, createdBy, removePlayer, isGameCreator }) => {
  return (
    <div className="player-list">
      <h1 className="player-list__header">Pelaajat</h1>
      {
        players.length > 0 ?
        players.map(player => <Player
          key={ player._id }
          id={ player._id }
          isCreator={ player._id == createdBy._id ? true : false }
          username={ player.username }
          accepted={ player.invAccepted }
          removePlayer={ removePlayer }
          isGameCreator={ isGameCreator }
        />) :
        <div>Peliin ei ole lisätty vielä pelaajia</div>
      }
    </div>
  )
}

export default PlayerList