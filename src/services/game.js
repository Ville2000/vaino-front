import axios from 'axios'
import loginService from './login';
const baseUrl = '/api/games'

const createGame = async () => {
  const config = loginService.getConfig()
  const { data } = await axios.post(baseUrl, {}, config)
  return data
}

const addPlayerToGame = async (gameId, player) => {
  const config = loginService.getConfig()
  const { data } = await axios.put(`${baseUrl}/${gameId}/addPlayer`, player, config)
  return data
}

const getGameById = async (gameId) => {
  const config = loginService.getConfig()
  const { data } = await axios.get(`${baseUrl}/${gameId}`, config)
  return data
}

const pollGameInvitations = async () => {
  const config = loginService.getConfig()
  const { data } = await axios.get(`${baseUrl}/invitedTo`, config)
  return data
}

const acceptInvitation = async (id) => {
  const config = loginService.getConfig()
  const { data } = await axios.put(`${baseUrl}/${id}/accept`, {}, config)
  console.log('Got data', data)
  return data
}

const denyInvitation = async (id) => {
  const config = loginService.getConfig()
  const { data } = await axios.put(`${baseUrl}/${id}/deny`, {}, config)
  return data
}

export default {
  addPlayerToGame,
  createGame,
  getGameById,
  pollGameInvitations,
  acceptInvitation,
  denyInvitation
}