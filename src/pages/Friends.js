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
      friends: [],
      notification: null,
      success: null,
      loadingFriends: true
    }
  }

  componentDidMount = async () => {
    const friends = await friendService.listFriends();

    this.setState({
      friends
    })

    this.setState({
      loadingFriends: false
    })
  }

  addFriend = async (e) => {
    e.preventDefault()

    try {
      const friends = await friendService.addFriend(this.state.username)

      this.setState({
        friends,
        username: ''
      })

      this.displaySuccess('Kaveri lisätty listaan')
    } catch(e) {
      this.setState({
        username: ''
      })
      
      this.displayNotification(e.response.data.error)
    }
  }

  deleteFriend = (id) => {
    return async () => {
      try {
        const friends = await friendService.removeFriend(id)

        this.setState({
          friends
        })
        this.displaySuccess('Kaveri poistettu listalta')
      } catch(e) {
        this.displayNotification(e.response.data.error)
      }
    }
  }

  handleUsernameChange = (e) => this.setState({ username: e.target.value })

  displayNotification = (notification) => {
    this.setState({ notification })

    setTimeout(() => {
      this.setState({ notification: null })
    }, 3000)
  }

  displaySuccess = (success) => {
    this.setState({ success })

    setTimeout(() => {
      this.setState({ success: null })
    }, 3000)
  }

  render() {
    return(
      <div className="friends__wrapper">
        <Link style={ backBtn } to="/profile">Takaisin</Link>
        <div className="friends__content">
          <h1 className="friends__content__header">Kaverit</h1>
          <FriendList
            friends={ this.state.friends }
            deleteFriend={ this.deleteFriend }
            loading={this.state.loadingFriends } />
          <FriendForm
            username={this.state.username}
            handleUsernameChange={ this.handleUsernameChange }
            addFriend={this.addFriend}
          />
        </div>
        { this.state.notification ? 
          <div className="friends__wrapper__notification">
            <p>{ this.state.notification }</p>
          </div> : null
        }
        { this.state.success ? 
          <div className="friends__wrapper__success">
            <p>{ this.state.success }</p>
          </div> : null
        }
      </div>
    )
  }
}

export default Friends