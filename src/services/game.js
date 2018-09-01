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
  return data
}

const denyInvitation = async (id) => {
  const config = loginService.getConfig()
  const { data } = await axios.put(`${baseUrl}/${id}/deny`, {}, config)
  return data
}

const leaveGame = async (id) => {
  const config = loginService.getConfig()
  const { data } = await axios.put(`${baseUrl}/${id}/leave`, {}, config)
  return data
}

const listGames = async () => {
  const config = loginService.getConfig()
  const { data } = await axios.get(`${baseUrl}`, config)
  return data
}

const addPoints = async (gameId, round, points) => {
  const config = loginService.getConfig()
  const { data } = await axios.post(`${baseUrl}/${gameId}/points/${round}`, points ,config)
  return data
}

const startGame = async (gameId) => {
  const config = loginService.getConfig()
  const { data } = await axios.get(`${baseUrl}/${gameId}/start`, config)
  return data
}

export default {
  addPlayerToGame,
  createGame,
  getGameById,
  pollGameInvitations,
  acceptInvitation,
  denyInvitation,
  leaveGame,
  listGames,
  addPoints,
  startGame
}