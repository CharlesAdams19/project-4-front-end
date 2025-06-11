import axios from 'axios'
import { getToken } from '../utils/auth'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

export const getAllItineraries = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/itineraries/all/`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })

    // Map _id to id for consistent frontend use
    return response.data.map(itin => ({
      id: itin.id || itin._id,
      ...itin
    }))
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

export const getSingleItinerary = async (itineraryId) => {
  try {
    const response = await axios.get(`${BASE_URL}/itineraries/${itineraryId}/`, {
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

export const updateItinerary = async (itineraryId, formData) => {
  try {
    const response = await axios.patch(`${BASE_URL}/itineraries/${itineraryId}/`, formData, {
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

export const getUserItineraries = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/itineraries`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })

    // Map _id to id for consistent frontend use
    return response.data.map(itin => ({
      id: itin.id || itin._id,
      ...itin
    }))
  } catch (err) {
    console.error(err.response ? err.response.data : err)
    throw err
  }
}

export const deleteItinerary = async (itineraryId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/itineraries/${itineraryId}/`, {
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

