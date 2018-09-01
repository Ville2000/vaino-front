import React, {Component} from 'react';
import './Profile.css'
import history from '../services/history'
import gameService from '../services/game'
import GameInvitationList from '../components/GameInvitationList/GameInvitationList';
import GameList from '../components/GameList/GameList';

class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      games: [],
      username: props.user.username,
      invitationInterval: null,
      pendingInvitations: [],
      displayInvitations: false
    }
  }

  componentDidMount = async () => {
    const games = await gameService.listGames()

    this.setState({
      games
    })

    this.initInterval()
  }

  componentWillUnmount = () => {
    this.removeInterval()
  }

  initInterval = () => {
    const invitationInterval = setInterval(async () => {
      const pendingInvitations = await gameService.pollGameInvitations()

      this.setState({
        pendingInvitations
      })
    }, 5000)

    this.setState({
      invitationInterval
    })
  }

  removeInterval = () => {
    clearInterval(this.state.invitationInterval)

    this.setState({
      invitationInterval: null
    })
  }

  createGame = async () => {
    const game = await gameService.createGame()
    history.push(`/newGame/${game._id}`)
  }

  navigateToFriends = () => {
    history.push('/friends')
  }

  acceptInvitation = (id) => {
    return async () => {
      try {
        this.removeInterval()

        await gameService.acceptInvitation(id);

        history.push(`/newGame/${id}`)
      } catch(e) {
        this.initInterval()
      }
    }
  }

  denyInvitation = (id) => {
    return async () => {
      try {
        this.removeInterval()

        await gameService.denyInvitation(id);

        const games = this.state.pendingInvitations.filter(game => game._id != id)

        this.setState({
          pendingInvitations: games
        })

        // TODO: Inform user the game invitation has been denied

        this.initInterval()
      } catch(e) {
        this.initInterval();
      }
    }
  }

  toggleInvitationList = () => {
    const displayInvitations = !this.state.displayInvitations

    this.setState({
      displayInvitations
    })
  }

  selectGame = (id) => {
    return async () => {
      const game = await gameService.getGameById(id)

      if (game.started) {
        history.push(`/game`)
      } else {
        history.push(`/newGame/${game._id}`)
      }
    }
  }

  render() {
    return (
      <div className="profile">
        <div className="profile__header">
          <h1>VÄINÖ</h1>
          { this.state.pendingInvitations && this.state.pendingInvitations.length > 0 ?
            <div
              className="profile__header__invitations"
              onClick={this.toggleInvitationList }>
              { this.state.pendingInvitations.length }</div> :
            <div></div>
          }
          <div className="profile__header__username">{ this.state.username }</div>
          <button className="btn btn--danger"onClick={this.props.logout}>Kirjaudu ulos</button>
        </div>
        <div className="profile__content">
          <GameList
            games={ this.state.games }
            selectGame={ this.selectGame }
          />
          <div className="profile__content__buttons">
            <button onClick={ this.navigateToFriends }className="btn btn--red">Kaverit</button>
            <button onClick={ this.createGame } className="btn btn--blue">Uusi peli</button>
          </div>
        </div>
        {
          this.state.displayInvitations ?
          <GameInvitationList
            invitations={ this.state.pendingInvitations }
            acceptInvitation={ this.acceptInvitation }
            denyInvitation={ this.denyInvitation }
            hideList={ this.toggleInvitationList }
          /> :
          null
        }
      </div>
    )
  }
}

export default Profile