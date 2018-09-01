import React from 'react'
import GameListGame from '../GameListGame/GameListGame';
import './GameList.css'

const GameList = ({ games, selectGame }) => {
  return (
    <div className="game-list">
      <div className="game-list__header">
        <small className="game-list__header__creator"><i>Luonut</i></small>
        <small className="game-list__header__date"><i>Pvm</i></small>
        <small className="game-list__header__players"><i>Pelaajat</i></small>
      </div>
      {
        games.map(game => 
          <GameListGame
            key={ game._id }
            game={ game }
            selectGame={ selectGame }
          />
        )
      }
    </div>
  )
}

export default GameList