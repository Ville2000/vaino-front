import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './components/NotFound'
import Profile from './pages/Profile';
import NewGame from './pages/NewGame';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Switch>
              <Route exact path="/" render={ () => <Home /> } />
              <Route path="/profile" render={ () => <Profile /> } />
              <Route path="/newGame" render={ () => <NewGame /> } />
              <Route render={ () => <NotFound /> } />
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}

export default App;
