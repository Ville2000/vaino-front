import React, { Component } from 'react';
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      firstname: '',
      lastname: ''
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
      password: ''
    })
  }

  handleRegister = (e) => {
    e.preventDefault();
    console.log("Registering")

    console.log("Registration info", this.state.firstname, this.state.lastname, this.state.username, this.state.password)
  }

  handleRegisterCancel = () => {
    console.log("Register cancel");

    this.setState({
      username: '',
      password: '',
      firstname: '',
      lastname: ''
    })
  }

  render() {
    return (
      <div className="container">
        <h1>Väinö</h1>
        <div className="login-buttons">
          <button>Rekisteröidy</button>
          <button>Kirjaudu</button>
          <RegisterForm
            username={this.state.username}
            firstname={this.state.firstname}
            lastname={this.state.lastname}
            password={this.state.password}
            handleChange={this.handleFormChange}
            handleRegister={this.handleRegister}
            handleRegisterCancel={this.handleRegisterCancel} />
          <LoginForm 
            handleChange={this.handleFormChange}
            handleLogin={this.handleLogin}
            handleLoginCancel={this.handleLoginCancel}
            username={this.state.username}
            password={this.state.password} />
        </div>
      </div>
    )
  }
}

export default App;
