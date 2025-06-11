import axios from 'axios'
import { getToken } from '../utils/auth'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

export const getAllShows = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/itineraries/shows/`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    return response.data
  } catch (err) {
    console.error(err.response ? err.response.data : err)
    throw err
  }
}
