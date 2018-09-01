import React from 'react'
import './Points.css'

const Points = ({
  pointData,
  addPoints
}) => {
  const colCount = pointData.players ? pointData.players.length : 0

  const formatPlayerScores = (player, i) => {
    const points = pointData.scores
      .filter(score => (score.player == player._id))
      .sort((a, b) => (a.round > b.round ? 1 : -1))

    const playerColumn = i + 2;

    let pointDivs = []  
    for (let j = 1; j <= 7; j++) {
      const point = points.find(point => point.round == j)

      const divStyle = {
        gridColumn: i + 2,
        gridRow: j + 1,
        justifySelf: 'center'
      }

      pointDivs = pointDivs.concat(point ? <div key={j} style={divStyle}>{point.points}</div> : <div key={j} style={divStyle}>-</div>)
    }
    
    return [<div style={
      {
        gridColumn: playerColumn,
        gridRow: 1,
        justifySelf: 'center'
      }} key={player._id}>{player.username}</div>].concat(pointDivs)
  }

  return (
    <div className="points">
      <div
        className="points__table"
        style={
          {
            display: 'grid',
            gridTemplateColumns: 'max-content repeat(' + colCount + ', minmax(80px, 1fr))',
            gridTemplateRows: 'repeat(8, 1fr)'
          }
        }>
        <div className="points__table__header">Peli</div>
        <div className="points__table__header"><i>2x3</i></div>
        <div className="points__table__header"><i>3&S</i></div>
        <div className="points__table__header"><i>2xS</i></div>
        <div className="points__table__header"><i>3x3</i></div>
        <div className="points__table__header"><i>2x3&S</i></div>
        <div className="points__table__header"><i>3&2xS</i></div>
        <div className="points__table__header"><i>3xS</i></div>
        {
          pointData.players.map(formatPlayerScores)
        }
      </div>
      <button
        className="points__add-points-btn btn btn--blue"
        onClick={ addPoints }
        typer="normal">
          Aseta pisteitä
      </button>
    </div>
  )
}

export default Points