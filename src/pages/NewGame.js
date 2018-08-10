  import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { backBtn } from './../misc/inlineStyles'
import gameService from './../services/game'
import playerService from './../services/player'
import PlayerSearchForm from './../components/PlayerSearchForm/PlayerSearchForm'
import PlayerList from '../components/PlayerList/PlayerList';

class NewGame extends Component {
  constructor(props) {
    super(props)

    this.state = {
      game: {
        _id: props.match.params.id
      },
      playerSearch: ''
    }

    console.log('id', props.match.params.id);
  }

  componentDidMount = async () => {
    console.log('Mounted')
    try {
      const game = await gameService.getGameById(this.state.game._id)
      this.setState({ game })
    } catch(err) {
      // TODO: Nappaa virhe
    }
  }

  addPlayer = async (e) => {
    e.preventDefault();
    const data = await gameService.addPlayerToGame(this.state.game._id, { username: this.state.playerSearch })
  }

  handleFormInputChange = (e) => {
    const input = e.target.value
    this.setState({ playerSearch: input })
  }

  handlePlayerSearch = async (e) => {
    e.preventDefault();
    const player = await playerService.searchPlayer(this.state.playerSearch)
  }

  render() {
    return (
      <div>
        <header>
          <Link style={backBtn} to="/">Takaisin</Link>
          <h1>Uusi peli</h1>
        </header>
        <main>
          <PlayerList />
          <PlayerSearchForm
            handleFormSubmit={this.handlePlayerSearch}
            handleFormInputChange={this.handleFormInputChange}
            formInput={this.state.playerSearch} />
          <button className='btn btn--blue'>Aloita peli</button>
        </main>
      </div>
    )
  }
}

export default NewGame