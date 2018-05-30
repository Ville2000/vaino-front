import React from 'react'
import history from '../services/history'
import { Link } from 'react-router-dom'
import './About.css'
import { backBtn } from '../misc/inlineStyles'

const About = () => {
  return (
    <div className="about__container">
      <Link style={ backBtn } to="/">Etusivulle</Link>
      <div>
        <p><i>Under construction...</i></p>
      </div>
    </div>
  )
}

export default About