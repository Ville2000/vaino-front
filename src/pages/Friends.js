import React, { Component } from 'react'
import { backBtn } from './../misc/inlineStyles'
import { Link } from 'react-router-dom'
import FriendList from './../components/FriendsList/FriendsList'
import friendService from './../services/friend'
import FriendForm from './../components/FriendForm/FriendForm'
import './Friends.css'

class Friends extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      friends: []
    }
  }

  componentDidMount = async () => {
    const friends = await friendService.listFriends();

    console.log('friends', friends)

    this.setState({
      friends
    })
  }

  addFriend = async (e) => {
    e.preventDefault();

    try {
      const friends = await friendService.addFriend(this.state.username)

      this.setState({
        friends,
        username: ''
      })
    } catch(e) {
      console.log('Virhe lisätessä kaveria')
    }
  }

  deleteFriend = (id) => {
    return async () => {
      try {
        const friends = await friendService.removeFriend(id)

        console.log('friends after delete', friends)

        this.setState({
          friends
        })
      } catch(e) {
        console.log('Virhe poistaessa kaveria')
      }
    }
  }

  handleUsernameChange = (e) => this.setState({ username: e.target.value })

  render() {
    return(
      <div className="friends__wrapper">
        <Link style={ backBtn } to="/profile">Takaisin</Link>
        <div className="friends__content">
          <h1 className="friends__content__header">Kaverit</h1>
          { (this.state.friends && this.state.friends.length > 0) ?
            <FriendList
              friends={this.state.friends}
              deleteFriend={ this.deleteFriend } /> :
            <div>Ei kavereita kaverilistalla</div>
          }
          <FriendForm
            username={this.state.username}
            handleUsernameChange={this.handleUsernameChange}
            addFriend={this.addFriend}
          />
        </div>
      </div>
    )
  }
}

export default Friends