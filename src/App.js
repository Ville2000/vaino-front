import React, { Component } from 'react'
import Home from './pages/Home'

const PAGES = {
  "/": Home
};

class App extends Component {
  render() {
    const PathHandler = PAGES[this.props.pathname];

    return (
      <PathHandler />
    )
  }
}

export default App;
