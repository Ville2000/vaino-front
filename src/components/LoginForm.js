import React from 'react';

const LoginFrom = ({handleLogin, handleLoginCancel, handleChange, username, password}) => {
  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          name="username"
          value={username}
          onChange={handleChange}
          type="text" />
        <input
          name="password"
          value={password}
          onChange={handleChange}
          type="text" />
        <button onClick={handleLoginCancel}>Peruuta</button>
        <button type="submit">Kirjaudu</button>
      </form>
    </div>
  )
}

export default LoginFrom