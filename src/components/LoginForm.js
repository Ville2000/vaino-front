import React from 'react';
import './LoginForm.css'

const LoginForm = ({handleLogin, handleLoginCancel, handleChange, username, password}) => {
  return (
    <div className='login-form'>
      <form onSubmit={handleLogin}>
        <input
          placeholder='Käyttäjätunnus'
          name="username"
          value={username}
          onChange={handleChange}
          type="text" />
        <input
          placeholder='Salasana'
          name="password"
          value={password}
          onChange={handleChange}
          type="text" />
        <div>
          <button type="button" onClick={handleLoginCancel}>Peruuta</button>
          <button type="submit">Kirjaudu</button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm