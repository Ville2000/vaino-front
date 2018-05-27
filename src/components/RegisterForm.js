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
          type="text" />
        </div>
        <div>
          <label htmlFor="password">Salasana</label>
          <input
            name="password"
            value={password}
            onChange={handleChange}
            type="text" />
        </div>
        <div>
          <label htmlFor="password">Salasana uudelleen</label>
          <input
            name="passwordAgain"
            value={passwordAgain}
            onChange={handleChange}
            type="text" />
        </div>
        <div className="register-form_buttons">
          <button type="button" onClick={handleRegisterCancel}>Peruuta</button>
          <button type="submit">Rekisteröidy</button>
        </div>
      </form>
    </div>
  )
}

export default RegisterForm