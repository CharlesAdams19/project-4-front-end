import { useState } from 'react'
import { createItinerary } from '../../services/itineraries'

export default function ItineraryCreate() {

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    start_date: '',
    end_date: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createItinerary(formData)
      console.log('Itinerary created!')
      // OPTIONAL → you can add navigation here later
    } catch (err) {
      console.error(err.response ? err.response.data : err)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Itinerary</h2>
      <input
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />
      <input
        name="start_date"
        type="date"
        value={formData.start_date}
        onChange={handleChange}
      />
      <input
        name="end_date"
        type="date"
        value={formData.end_date}
        onChange={handleChange}
      />
      <button type="submit">Create</button>
    </form>
  )
}
