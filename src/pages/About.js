import React from 'react'
import history from '../services/history'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div>
      <Link to="/">Etusivulle</Link>
      <p>Väinö on blaa blaa blaa...</p>
    </div>
  )
}

export default About