import axios from 'axios'
const baseUrl = '/api/users'

const register = async (registerInfo) => {
  const { data } = await axios.post(baseUrl, registerInfo)
  return data
}

export default { register }