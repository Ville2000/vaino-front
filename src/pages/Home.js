import React, { Component } from 'react';
import LoginForm from '../components/LoginForm';
import loginService from '../services/login'
import RegisterForm from '../components/RegisterForm'
import './Home.css'
import Notification from '../components/Notification'
import registerService from '../services/register'
import { Link } from 'react-router-dom'

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
      this.props.setUser(user)
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

      window.localStorage.setItem('vainoUser', JSON.stringify(user))
      this.setState({ username: '', password: '', passwordAgain: '', user })
      this.props.setUser(user)
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
      displayRegisterForm: false,
      notification: null
    })
  }

  toggleDisplay = (e) => {
    if (e.target.name === 'displayLoginForm') {
      const user = window.localStorage.getItem('vainoUser')

      if (user) {
        this.setState({ user })
        this.props.setUser(user)
        return
      }
    }

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
    const linkStyle = {
      'justifySelf': 'end',
      'alignSelf': 'center',
      'color': 'white',
      'fontSize': '12px'
    }

    return(
      <div className="home">
        <Link style={linkStyle} to="/about">What the...?</Link>
        {/* <hi>Väinö</hi> */}
        <div className="home__title">
          <h1>VÄINÖ</h1>
          <p>The Ultimate Card Game</p>
        </div>
        { this.state.notification ? 
          <Notification notification={this.state.notification} /> :
          <div></div> }
        { this.state.displayLoginForm || this.state.displayRegisterForm ?
          null :
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
        <div className="home_footer">
          <p>(C) 2018 Ville Haapavaara</p>
        </div>
      </div>
    )
  }
}

export default Home