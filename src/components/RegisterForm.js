import React from 'react';
import './RegisterForm.css'

const RegisterForm = ({
  username,
  firstname,
  lastname,
  password,
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
          <label htmlFor="firstname">Etunimi</label>
          <input
            name="firstname"
            value={firstname}
            onChange={handleChange}
            type="text" />
        </div>
        <div>
          <label htmlFor="lastname">Sukunimi</label>
          <input
            name="lastname"
            value={lastname}
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
        <div className="register-form_buttons">
          <button type="button" onClick={handleRegisterCancel}>Peruuta</button>
          <button type="submit">Rekisteröidy</button>
        </div>
      </form>
    </div>
  )
}

export default RegisterForm