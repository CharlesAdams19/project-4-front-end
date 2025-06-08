import axios from 'axios'
import { getToken } from '../utils/auth'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export const getAllItineraries = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/itineraries/all/`, {
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

export const createItinerary = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/itineraries/`, formData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    return response.data
  } catch (err) {
    console.error(err.response ? err.response.data : err)
    throw err
  }
}
