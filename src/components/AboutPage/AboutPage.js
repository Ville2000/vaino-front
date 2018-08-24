import React from 'react'
import './AboutPage.css'

const AboutPage = ({ pageTitle, pageImgSrc, pageContent }) => {
  return (
    <div className="about-page__content">
      <h1>{ pageTitle }</h1>
      <p>{ pageContent }</p>
    </div>
  )
}

export default AboutPage