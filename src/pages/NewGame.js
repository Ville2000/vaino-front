import React, {Component} from 'react'
import gameService from './../services/game'
import playerService from './../services/player'
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
      isGameCreator: false
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

      // TODO: Start interval
      // TODO: Päivitä data. Tarkista onko started. Jos started niin push Game-sivulle!
    } catch(err) {
      // TODO: Nappaa virhe
    }
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
    console.log('Leaving game')
    // try {
    //   await gameService.leaveGame(this.state.gameId)
      
    //   history.push('/profile')
    // } catch(e) {
    //   console.log('leave game', e)
    // }
  }

  componentWillUnmount = () => {
    // TODO: Clear interval
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
              <button className="new-game__content__btn btn btn--blue">Aloita peli</button>
            </div> :
            <div></div>
          }
        </main>
      </div>
    )
  }
}

export default NewGame