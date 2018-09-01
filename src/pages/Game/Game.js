import React, { Component } from 'react'
import gameService from './../../services/game'
import PageHeader from '../../components/PageHeader/PageHeader';
import AddPoints from '../../components/AddPoints/AddPoints';
import Points from '../../components/Points/Points';
import roundService from './../../services/round'
import './Game.css'

class Game extends Component {
  constructor(props) {
    super(props)

    this.state = {
      gameId: props.match.params.id,
      game: null,
      pointsInput: '',
      pageTitle: 'Pistetilanne',
      addPoints: false,
      roundNumber: 1,
      round: roundService[1],
      pointData: {
        players: [],
        scores: []
      }
    }
  }

  componentDidMount = async () => {
    console.log(this.state.gameId)

    try {
      const game = await gameService.getGameById(this.state.gameId)

      this.setState({
        game,
        pointData: {
          players: game.players,
          scores: game.scores
        }
      })

      // TODO: Interval
    } catch(e) {
      console.log('Virhe tul')
    }
  }

  componentWillUnmount = () => {
    // TODO:
  }

  handleInputChange = (e) => {
    this.setState({
      pointsInput: e.target.value
    })
  }

  addPoints = async (e) => {
    e.preventDefault()

    try {
      const result = await gameService.addPoints(this.state.game._id, this.state.roundNumber, { points: this.state.pointsInput })
      console.log('Result', result)

      await this.setState({
        addPoints: false,
        pageTitle: 'Pistetilanne'
      })

      this.changeRound(1)()
    } catch(e) {
      console.log('Virheppä tul', e)
    }
  }

  changeRound = (val) => {
    return () => {
      const nextRound = this.state.roundNumber + val

      if (nextRound >= 1 &&
          nextRound <= 7) {
        this.setState({
          round: roundService[nextRound],
          roundNumber: nextRound
        })
      }
    }
  }

  toggleView = () => {
    this.setState({
      pageTitle: this.state.pageTitle === 'Pistetilanne' ? 'Aseta pisteitä' : 'Pistetilanne',
      addPoints: !this.state.addPoints
    })
  }

  render() {
    return (
      <div className="game">
        <PageHeader
          title={ this.state.pageTitle }
        />
        {
          this.state.addPoints ?
          <AddPoints
            inputValue={ this.state.pointsInput }
            handleInputChange={ this.handleInputChange }
            addPoints={ this.addPoints }
            round={ this.state.round }
            changeRound={ this.changeRound }
            viewPoints={ this.toggleView }
          /> :
          <Points
            pointData={ this.state.pointData }
            addPoints={ this.toggleView }
          />
        }
      </div>
    )
  }
}

export default Game