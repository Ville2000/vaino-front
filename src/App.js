import React, { Component } from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './components/NotFound'
import Profile from './pages/Profile';
import NewGame from './pages/NewGame';
import history from './services/history'
import About from './pages/About'
import Friends from './pages/Friends'
import Game from './pages/Game/Game'

class App extends Component {
  constructor() {
    super()
    this.state = {
      user: JSON.parse(window.localStorage.getItem('vainoUser'))
    }
  }

  login = (user) => {
    this.setState({ user })
  }
  
  logout = () => {
    this.setState({ user: null })
    window.localStorage.removeItem('vainoUser')
  }

  render() {
    const style = {
      height: '100%'
    }

    return (
      <div style={style}>
        <Router history={history}>
          <Switch>
            <Route exact path="/" render={ () =>
              this.state.user ?
              <Redirect to="/profile" /> : 
              <Home setUser={ this.login } />
              } />
            <Route path="/profile" render={ () => this.state.user ? 
              <Profile
                user={ this.state.user }
                logout={ this.logout } /> :
              <Redirect to="/" />
              } />
            { this.state.user && 
              <Route exact path="/newGame/:id" component={NewGame} />
            }
            <Route path="/friends" render={ () => this.state.user ?
              <Friends /> :
              <Redirect to="/" />
              } />
            <Route path="/about" render={ () => <About /> } />
            <Route path="/game" component={ Game } />
            <Route render={ () => <NotFound /> } />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;
