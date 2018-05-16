import React, { Component } from 'react';
import LoginForm from '../components/LoginForm';
import loginService from '../services/login'
import RegisterForm from '../components/RegisterForm'
import './Home.css'

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      firstname: '',
      lastname: '',
      displayRegisterForm: false,
      displayLoginForm: false
    }
  }

  handleFormChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleLogin = (e) => {
    e.preventDefault();
    loginService.login({
      username: this.state.username,
      password: this.state.password,
    })
  }

  handleLoginCancel = () => {
    this.setState({
      username: '',
      password: '',
      displayLoginForm: false,
      displayRegisterForm: false
    })
  }

  handleRegister = (e) => {
    e.preventDefault();
    console.log("Registration info", this.state.firstname, this.state.lastname, this.state.username, this.state.password)
  }

  handleRegisterCancel = () => {
    this.setState({
      username: '',
      password: '',
      firstname: '',
      lastname: '',
      displayLoginForm: false,
      displayRegisterForm: false
    })
  }

  toggleDisplay = (e) => {
    this.setState({
      [e.target.name]: true
    })
  }

  render() {
    return(
      <div className="home">
        <h1>Väinö</h1>
        { (this.state.displayLoginForm || this.state.displayRegisterForm) ? null :
          <div className="home_buttons">
            <button className="home_buttons_register" name="displayRegisterForm" onClick={this.toggleDisplay}>Rekisteröidy</button>
            <button className="home_buttons_login" name="displayLoginForm" onClick={this.toggleDisplay}>Kirjaudu</button>
          </div> }
        { this.state.displayLoginForm ?
          <LoginForm
            handleChange={this.handleFormChange}
            handleLogin={this.handleLogin}
            handleLoginCancel={this.handleLoginCancel}
            username={this.state.username}
            password={this.state.password} /> : null }
        { this.state.displayRegisterForm ?
          <RegisterForm
            username={this.state.username}
            firstname={this.state.firstname}
            lastname={this.state.lastname}
            password={this.state.password}
            handleChange={this.handleFormChange}
            handleRegister={this.handleRegister}
            handleRegisterCancel={this.handleRegisterCancel} /> : null }
      </div>
    )
  }
}

export default Home