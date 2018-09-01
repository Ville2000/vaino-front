import React from 'react'
import './GameListGame.css'

const GameListGame = ({
  game,
  selectGame
}) => {
  const begin = formatDate(new Date(game.beginTime))
  let end;

  if (game.endTime) end = formatDate(new Date(game.endTime))

  const gameListGameClass = `game-list-game${
    end ?
    '--ended' :
    game.started ?
    '--active':
    ''}`

  return (
    <div className={gameListGameClass} onClick={selectGame(game._id)}>
      <div className="game-list-game__creator"> 
        <p>{ game.createdBy.username }</p>
      </div> 
      <div className="game-list-game__date">
        <p>{ begin }</p>
      </div>
      <div className="game-list-game__players">
        <p>{ game.players.length }</p>
      </div>
    </div>
  )
}

const formatDate = (date) => {
  return `${date.getDate()}.${date.getMonth() + 1}.`
}

export default GameListGame