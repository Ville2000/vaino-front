import React from 'react'
import './AddPoints.css'

const AddPoints = ({
  addPoints,
  handleInputChange,
  inputValue,
  round,
  changeRound,
  viewPoints
}) => {
  return (
    <div className="add-points">
      <div
        className="add-points__left"
        onClick={ changeRound(-1) }>
        <i className="left"></i>
      </div>
      <div className="add-points__content">
        <div className="add-points__content__description">
          <h1>{ round.title }</h1>
          {
            round.content.map(content => <p>{ content }</p>)
          }
        </div>
        <form
          className="add-points__content__form"
          onSubmit={ addPoints }>
          <label>Pisteesi</label>
          <input
            type="text"
            value={ inputValue }
            onChange={ handleInputChange }
          />
          <button
            className="btn btn--blue"
            type="submit">
              Lisää pisteet
          </button>
        </form>
        <button
          className="add-points__content__results btn btn--red"
          type="normal"
          onClick={ viewPoints }>
            Tulokset
        </button>
      </div>
      <div
        className="add-points__right"
        onClick={ changeRound(1) }>
        <i className="right"></i>
      </div>
    </div>
  )
}

export default AddPoints