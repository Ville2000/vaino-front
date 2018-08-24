import axios from 'axios'
const baseUrl = '/api/about'

const aboutPages = [
  {
    title: 'Väinö?',
    imgSrc: '',
    content: 'Väinö on korttipeli!'
  },
  {
    title: 'Pelin aloittaminen',
    imgSrc: '',
    content: 'Jaa kortit'
  },
  {
    title: 'Pelin voittaminen',
    imgSrc: '',
    content: 'Kerää vähiten pisteitä'
  }
]

const getAboutPageData = async () => {
  const { data } = await axios.get(baseUrl)
  return data
}

export default {
  aboutPages,
  getAboutPageData
}