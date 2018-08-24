import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './About.css'
import { backBtn } from '../misc/inlineStyles'
import aboutService from '../services/about'
import AboutPage from '../components/AboutPage/AboutPage';

class About extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentPageIndex: 0,
      currentPage: null,
      pages: []
    }
  }

  componentDidMount = async () => {
    const aboutPages = await aboutService.getAboutPageData()

    this.setState({
      pages: aboutPages,
      currentPage: aboutPages[0]
    })

    console.table(aboutPages)
  }

  moveByNumber = (number) => {
    return () => {
      console.log('Moving by', number)

      const nextPage = this.state.currentPageIndex + number

      if (nextPage >= 0 && nextPage < this.state.pages.length) {
        this.setState({
          currentPageIndex: nextPage,
          currentPage: this.state.pages[nextPage]
        })
      }
    }
  }

  render() {
    return (
      <div className="about__wrapper">
        <Link style={ backBtn } to="/">Etusivulle</Link>
        <div className="about__content">
          <div className="about__content__page-number">
            <p>{this.state.currentPageIndex + 1} / {this.state.pages.length}</p>
          </div>
          <div
            className="about__content__left"
            onClick={this.moveByNumber(-1)}>
            <i className="left"></i>
          </div>
          { this.state.currentPage ? <AboutPage pageTitle={this.state.currentPage.title} pageImgSrc={this.state.currentPage.imgSrc} pageContent={this.state.currentPage.content} /> : <div></div> }
          <div
            className="about__content__right"
            onClick={this.moveByNumber(1)}>
            <i className="right"></i>
          </div>
        </div>
      </div>
    )
  }
}

export default About