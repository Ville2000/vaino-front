import React, {Component} from 'react';

class Profile extends Component {
  render() {
    return (
      <div>
        <div>
          <h1>Navbar</h1>
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