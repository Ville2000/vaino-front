import axios from 'axios'
const baseUrl = '/api/login'

const login = async (loginInfo) => {
  const { data } = await axios.post(baseUrl, loginInfo)
  return data;
}

const logout = () => {
  window.localStorage.removeItem('vainoUser')
}

const getConfig = () => {
  const token = JSON.parse(window.localStorage.getItem('vainoUser'))
  
  let config = {
    headers: {}
  }

  if (token) config.headers.authorization = `bearer ${token.token}`

  return config
}

export default { login, logout, getConfig }