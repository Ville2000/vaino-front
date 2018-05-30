import React from 'react';
import './RegisterForm.css'

const RegisterForm = ({
  username,
  password,
  passwordAgain,
  handleChange,
  handleRegister,
  handleRegisterCancel
}) => {
  return (
    <div className="register-form">
      <form onSubmit={handleRegister}>
       <div>
        <label htmlFor="username">Käyttäjätunnus</label>
        <input
          name="username"
          value={username}
          onChange={handleChange}
          type="text"
          autoComplete="off" />
        </div>
        <div>
          <label htmlFor="password">Salasana</label>
          <input
            name="password"
            value={password}
            onChange={handleChange}
            type="password" />
        </div>
        <div>
          <label htmlFor="password">Salasana uudelleen</label>
          <input
            name="passwordAgain"
            value={passwordAgain}
            onChange={handleChange}
            type="password" />
        </div>
        <div className="register-form_buttons">
          <button className="btn btn--warning" type="button" onClick={handleRegisterCancel}>Peruuta</button>
          <button className="btn btn--success" type="submit">Rekisteröidy</button>
        </div>
      </form>
    </div>
  )
}

export default RegisterForm