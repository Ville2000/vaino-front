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
      invitationInterval: null,
      pendingInvitations: [],
      displayInvitations: false
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
    const invitationInterval = clearInterval(this.state.invitationInterval)

    this.setState({
      invitationInterval
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
        
        const games = this.state.pendingInvitations.filter(game => game._id != id)

        this.setState({
          pendingInvitations: games
        })

        // TODO: Inform user the game invitation has been accepted

        this.initInterval()
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