import React, {Component} from 'react'
import gameService from './../services/game'
import PlayerSearchForm from './../components/PlayerSearchForm/PlayerSearchForm'
import PlayerList from '../components/PlayerList/PlayerList';
import history from '../services/history'
import './NewGame.css'
import PageHeader from '../components/PageHeader/PageHeader';
import loginService from './../services/login'

class NewGame extends Component {
  constructor(props) {
    super(props)

    this.state = {
      gameId: props.match.params.id, 
      game: {
        createdBy: {},
        players: []
      },
      createdBy: {},
      players: [],
      playerToAdd: '',
      isGameCreator: false,
      gameStartedInterval: null
    }
  }

  componentDidMount = async () => {
    try {
      const game = await gameService.getGameById(this.state.gameId)

      const isGameCreator = loginService.getLoggedInUserUsername() === game.createdBy.username ? true : false
      
      this.setState({
        isGameCreator
      })

      this.setGameToState(game)

      this.initInterval()
    } catch(err) {
      // TODO: Nappaa virhe
    }
  }

  componentWillUnmount = () => {
    clearInterval(this.state.gameStartedInterval)

    this.setState({
      gameStartedInterval: null
    })
  }

  initInterval = () => {
    const gameStartedInterval = setInterval(async () => {
      const game = await gameService.getGameById(this.state.gameId)

      if (game && game.started)
        history.push(`/game/${game._id}`)
    }, 5000)

    this.setState({
      gameStartedInterval
    })
  }

  addPlayer = async (e) => {
    e.preventDefault();

    try {
      const game = await gameService.addPlayerToGame(this.state.game._id, { username: this.state.playerToAdd })
      
      this.setGameToState(game)
    } catch(e) {
      // TODO: Ilmoita virheestä, että pelaajaa ei löytynyt. Tee yleinen ilmoituskomponentti?
      console.log('addPlayer', e)
    }
  }

  handleFormInputChange = (e) => {
    const input = e.target.value
    this.setState({ playerToAdd: input })
  }

  setGameToState = (game) => {
    this.setState({
      game,
      players: game.players,
      createdBy: game.createdBy,
      playerToAdd: ''
    })
  }

  removePlayer = (id) => {
    return () => {
      console.log('Remove player', id)
    }
  }

  leaveGame = async () => {
    try {
      await gameService.leaveGame(this.state.gameId)
      
      history.push('/profile')
    } catch(e) {
      console.log('leave game', e)
    }
  }

  startGame = async () => {
    const status = await gameService.startGame(this.state.gameId)

    if (status === 'OK')
      history.push(`/game/${this.state.gameId}`)
  }

  render() {
    return (
      <div className="new-game">
        <PageHeader
          title="Uusi peli"
          link={ {
            title: "Poistu",
            click: this.leaveGame
          } }
        />
        <main className="new-game__content">
          <div className="new-game__content__player-list-wrapper">
            <PlayerList
              players={ this.state.players }
              createdBy={ this.state.createdBy }
              removePlayer={ this.removePlayer }
              isGameCreator={ this.state.isGameCreator }
            />
          </div>
          {
            this.state.isGameCreator ?
            <div>
              <PlayerSearchForm
                handleFormSubmit={this.addPlayer}
                handleFormInputChange={this.handleFormInputChange}
                formInput={this.state.playerToAdd} />
              <button
                onClick={ this.startGame }
                className="new-game__content__btn btn btn--blue">Aloita peli</button>
            </div> :
            <div></div>
          }
        </main>
      </div>
    )
  }
}

export default NewGame