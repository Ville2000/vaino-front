import React from 'react'
import { Link } from 'react-router-dom'
import { backBtn } from './../../misc/inlineStyles'
import './PageHeader.css'

const PageHeader = ({ title, link }) => {
  return (
    <header className="page-header">
      <Link style={backBtn} to="/">Takaisin</Link>
      {
        title ? <div className="page-header__title">{title}</div> : <div></div>
      }
      {
        link ? 
        <button
          className="page-header__btn btn btn--danger"
          onClick={ link.click }>
          { link.title }
        </button> :
        <div></div>
      }
    </header>
  )
}

export default PageHeader