import React, { Component } from 'react';
import LoginForm from '../components/LoginForm';
import loginService from '../services/login'
import RegisterForm from '../components/RegisterForm'
import './Home.css'
import Notification from '../components/Notification'
import registerService from '../services/register'

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      username: '',
      password: '',
      passwordAgain: '',
      displayRegisterForm: false,
      displayLoginForm: false,
      notification: null
    }
  }

  handleFormChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password,
      })
  
      window.localStorage.setItem('vainoUser', JSON.stringify(user))
      this.setState({ username: '', password: '', user })
    } catch(exception) {
      this.displayNotification({
        type: 'error',
        message: exception.response.data.error
      })
    }
  }

  handleRegister = async (e) => {
    e.preventDefault();

    if (!(this.state.password === this.state.passwordAgain)) {
      this.setState({ username: '', password: '', passwordAgain: '' })
      this.displayNotification({
        type: 'error',
        message: 'Salasanat eivät täsmää'
      })
      return
    }

    try {
      const user = await registerService.register({
        username: this.state.username,
        password: this.state.password
      })

      console.log('user', user) // Käyttäjänimi tulee tänne oikein
    } catch(exception) {
      this.displayNotification({
        type: 'error',
        message: exception.response.data.error
      })
    }
  }

  handleFormCancel = () => {
    this.setState({
      username: '',
      password: '',
      passwordAgain: '',
      displayLoginForm: false,
      displayRegisterForm: false
    })
  }

  toggleDisplay = (e) => {
    this.setState({
      [e.target.name]: true
    })
  }

  displayNotification = (notification) => {
    this.setState({ notification })

    console.log(this.state.notification)

    setTimeout(() => {
      this.setState({ notification: null })
    }, 5000)
  }

  render() {
    return(
      <div className="home">
        <h1>Väinö</h1>
        { this.state.notification ?
          <Notification notification={this.state.notification} /> : null }
        { (this.state.displayLoginForm || this.state.displayRegisterForm) ? null :
          <div className="home_buttons">
            <button className="home_buttons_register" name="displayRegisterForm" onClick={this.toggleDisplay}>Rekisteröidy</button>
            <button className="home_buttons_login" name="displayLoginForm" onClick={this.toggleDisplay}>Kirjaudu</button>
          </div> }
        { this.state.displayLoginForm ?
          <LoginForm
            handleChange={this.handleFormChange}
            handleLogin={this.handleLogin}
            handleLoginCancel={this.handleFormCancel}
            username={this.state.username}
            password={this.state.password} /> : null }
        { this.state.displayRegisterForm ?
          <RegisterForm
            username={this.state.username}
            password={this.state.password}
            passwordAgain={this.state.passwordAgain}
            handleChange={this.handleFormChange}
            handleRegister={this.handleRegister}
            handleRegisterCancel={this.handleFormCancel} /> : null }
      </div>
    )
  }
}

export default Home