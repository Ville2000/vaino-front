import React, { Component } from 'react'
import Home from './pages/Home'
import NotFound from './components/NotFound'
import Profile from './pages/Profile';
import NewGame from './pages/NewGame';

// TODO Nämä eivät toimi, jos backend jakaa ohjelman staattisena
// Tulee vaihtaa React-routeriin
const PAGES = {
  "/": Home,
  "/profile": Profile,
  "/newGame": NewGame
};

class App extends Component {
  render() {
    const PathHandler = PAGES[this.props.pathname] || NotFound;

    return (
      <PathHandler />
    )
  }
}

export default App;
