import React, { Component } from 'react';
import loginService from './services/login'
import LoginForm from './components/LoginForm'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: ''
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
      password: this.state.password
    })
  }

  handleLoginCancel = () => {
    this.setState({
      username: '',
      password: ''
    })
  }

  render() {
    return (
      <div className="container">
        <h1>Väinö</h1>
        <div className="login-buttons">
          <button>Rekisteröidy</button>
          <button>Kirjaudu</button>
          <LoginForm 
            handleChange={this.handleFormChange}
            handleLogin={this.handleLogin}
            handleLoginCancel={this.handleLoginCancel}
            username={this.state.username}
            password={this.state.password}/>
        </div>
      </div>
    )
  }
}

export default App;
