import axios from 'axios'
import loginService from './login';
const baseUrl = '/api/friends'

// TODO: Add friend idn mukaan
// TODO: Poista kaveri idn mukaan

const listFriends = async () => {
  const config = loginService.getConfig();

  const { data } = await axios.get(baseUrl, config);
  return data
}

const addFriend = async (username) => {
  console.log('Lisää kaveri', username)

  const config = loginService.getConfig();

  const { data } = await axios.post(baseUrl, { username }, config)
  return data
}

const removeFriend = async (id) => {
  const config = loginService.getConfig();

  const { data } = await axios.delete(`${baseUrl}/${id}`, config)
  return data
}

export default {
  listFriends,
  addFriend,
  removeFriend
}