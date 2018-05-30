import React from 'react';
import './LoginForm.css'

const LoginForm = ({handleLogin, handleLoginCancel, handleChange, username, password}) => {
  return (
    <div className="container">
      <form className="login-form" onSubmit={handleLogin}>
        <div className="login-form__field">
          <label htmlFor="username">Käyttäjätunnus</label>
          <input
            name="username"
            value={username}
            onChange={handleChange}
            type="text"
            autoComplete="off" />
          </div>
          <div className="login-form__field">
            <label htmlFor="password">Salasana</label>
            <input
              name="password"
              value={password}
              onChange={handleChange}
              type="password" />
          </div>
        <div className="login-form__buttons">
          <button className="btn btn--warning" type="button" onClick={handleLoginCancel}>Peruuta</button>
          <button className="btn btn--success" type="submit">Kirjaudu</button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm