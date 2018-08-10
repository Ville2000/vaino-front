import axios from 'axios'
import loginService from './login';
const baseUrl = '/api/games'

const createGame = async () => {
  const config = loginService.getConfig()
  console.log('config', config)
  const { data } = await axios.post(baseUrl, {}, config)
  return data
}

const addPlayerToGame = async (gameId, player) => {
  const { data } = await axios.put(`${baseUrl}/${gameId}/addPlayer`, player)
  return data
}

const getGameById = async (gameId) => {
  const config = loginService.getConfig();
  const { data } = await axios.get(`${baseUrl}/${gameId}`, config)
  return data
}

export default {
  addPlayerToGame,
  createGame,
  getGameById
}