import { useState } from 'react'
import { createItinerary } from '../../services/itineraries'
import { Calendar } from 'react-big-calendar'
import enGB from 'date-fns/locale/en-GB'
import { dateFnsLocalizer } from 'react-big-calendar'
import { parseISO } from 'date-fns'
import { format } from 'date-fns'
import { useNavigate } from 'react-router'

import 'react-big-calendar/lib/css/react-big-calendar.css'

const locales = {
  'en-GB': enGB,
}

const localizer = dateFnsLocalizer({
  format,
  parse: parseISO,
  startOfWeek: () => new Date(),
  getDay: (date) => date.getDay(),
  locales,
})

export default function ItineraryCreate() {
  const navigate = useNavigate()
  const [events, setEvents] = useState([])

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    start_date: '',
    end_date: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSelectSlot = ({ start, end }) => {
    const show_name = prompt('Enter show name:')
    const venue = prompt('Enter venue:')

    if (show_name && venue) {
      const newEvent = {
        id: Date.now(),
        title: show_name,
        start,
        end,
        venue,
      }
      setEvents([...events, newEvent])
    }
  }

  const handleEventDelete = (eventId) => {
    if (window.confirm('Delete this event?')) {
      setEvents(events.filter((event) => event.id !== eventId))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createItinerary({
        ...formData,
        itinerary_items: events.map((event) => ({
          id: event.id,
          show_name: event.title,
          start: event.start.toISOString(),
          end: event.end.toISOString(),
          venue: event.venue,
        })),
      })
      console.log('Itinerary created!')
      navigate('/itineraries')
    } catch (err) {
      console.error(err.response ? err.response.data : err)
    }
  }

  return (
    <>
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

      <h3>Add Shows to Calendar</h3>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={(event) => handleEventDelete(event.id)}
        style={{ height: 500, margin: '50px' }}
      />
    </>
  )
}
