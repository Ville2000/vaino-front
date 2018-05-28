import React, {Component} from 'react';

class Profile extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div>
          <h1>Navbar</h1>
          <p>{ this.props.user.username }</p>
          <button onClick={this.props.logout}>Kirjaudu ulos</button>
        </div>
        <div>
          <h1>Profiili</h1>
          <div>
            <div>
              <h2>Viimeiset pelisi</h2>
            </div>
            <div>
              <button>Uusi peli</button>
              <button>Kaverit</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile