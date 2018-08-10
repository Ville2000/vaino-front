import React, {Component} from 'react';
import './Profile.css'
import history from '../services/history'
import gameService from '../services/game'

class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      games: []
    }
  }

  createGame = async () => {
    const game = await gameService.createGame()
    history.push(`/newGame/${game._id}`)
  }

  render() {
    return (
      <div className="profile">
        <div className="profile__header">
          <h1>VÄINÖ</h1>
          <button className="btn btn--danger"onClick={this.props.logout}>Kirjaudu ulos</button>
        </div>
        <div className="profile__content">
          <div className="profile__content__previous-games">
            <h1>Viimeiset pelisi</h1>
            { (this.state.games.length < 1) ?
              <p><i>Ei viimeisiä pelejä</i></p> :
              <div>Tee hyvä miäs tästä komponentti</div>}
          </div>
          <div className="profile__content__buttons">
            <button onClick={() => history.push('/friends')}className="btn btn--red">Kaverit</button>
            <button onClick={ this.createGame } className="btn btn--blue">Uusi peli</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile