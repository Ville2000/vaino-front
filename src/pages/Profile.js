import React, {Component} from 'react';
import './Profile.css'
import history from '../services/history'
import gameService from '../services/game'
import GameInvitationList from '../components/GameInvitationList/GameInvitationList';

class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      games: [],
      username: props.user.username,
      pollInvitations: true,
      invitationInterval: null,
      pendingInvitations: [],
      displayInvitations: true
    }
  }

  componentDidMount = async () => {
    const pendingInvitations = await gameService.pollGameInvitations()

    this.setState({
      pendingInvitations
    })

    this.initInterval()
  }

  componentWillUnmount = () => {
    this.removeInterval()
  }

  initInterval = () => {
    const invitationInterval = setInterval(async () => {

      if (this.state.pollInvitations) {
        const pendingInvitations = await gameService.pollGameInvitations()

        this.setState({
          pendingInvitations
        })
      }
    }, 3000)

    this.setState({
      invitationInterval
    })
  }

  removeInterval = () => {
    clearInterval(this.state.invitationInterval)

    this.setState({
      invitationInterval: null,
      pollInvitations: false
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
      console.log('Accept', id)

      try {
        this.removeInterval()

        const data = await gameService.acceptInvitation(id);
        console.log('Data', data)

        this.initInterval()
      } catch(e) {
        this.initInterval()
      }
    }
  }

  denyInvitation = (id) => {
    return async () => {
      console.log('Deny', id)

      try {
        this.removeInterval()

        const data = await gameService.denyInvitation(id);
        console.log('Data', data)

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
          <div className="profile__content__previous-games">
            <h1>Viimeiset pelisi</h1>
            { (this.state.games.length < 1) ?
              <p><i>Ei viimeisiä pelejä</i></p> :
              <div>Tee hyvä miäs tästä komponentti</div>}
          </div>
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