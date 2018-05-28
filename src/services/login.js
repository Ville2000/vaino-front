import axios from 'axios'
const baseUrl = '/api/login'

const login = async (loginInfo) => {
  const { data } = await axios.post(baseUrl, loginInfo)
  return data;
}

const logout = () => {
  window.localStorage.removeItem('vainoUser')
}

export default { login, logout }