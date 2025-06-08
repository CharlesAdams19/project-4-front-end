import { useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { getSingleItinerary, updateItinerary } from '../../services/itineraries'
import { useParams, useNavigate } from 'react-router'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import { parseISO } from 'date-fns'
import { format } from 'date-fns'
import { dateFnsLocalizer } from 'react-big-calendar'

import enGB from 'date-fns/locale/en-GB'

const locales = {
  'en-GB': enGB,
}

const localizer = dateFnsLocalizer({
  format,
  parse: parseISO,
  startOfWeek: () => new Date(),
  getDay: date => date.getDay(),
  locales,
})

export default function ItineraryEdit() {
  const { itineraryId } = useParams()
  const navigate = useNavigate()

  const [itinerary, setItinerary] = useState(null)
  const [events, setEvents] = useState([])

  useEffect(() => {
    async function fetchItinerary() {
      try {
        const data = await getSingleItinerary(itineraryId)
        setItinerary(data)
        setEvents(
          data.itinerary_items.map(item => ({
            id: item.id,
            title: item.show_name,
            start: new Date(item.start),
            end: new Date(item.end),
            venue: item.venue,
          }))
        )
      } catch (err) {
        console.error(err)
      }
    }
    fetchItinerary()
  }, [itineraryId])

  const handleSelectSlot = ({ start, end }) => {
    const show_name = prompt('Enter show name:')
    const venue = prompt('Enter venue:')

    if (show_name && venue) {
      const newEvent = {
        id: Date.now(), // temporary id
        title: show_name,
        start,
        end,
        venue,
      }
      setEvents([...events, newEvent])
    }
  }

  const handleEventDelete = eventId => {
    if (window.confirm('Delete this event?')) {
      setEvents(events.filter(event => event.id !== eventId))
    }
  }

  const handleSave = async () => {
    try {
      await updateItinerary(itineraryId, {
        itinerary_items: events.map(event => ({
          id: event.id,
          show_name: event.title,
          start: event.start.toISOString(),
          end: event.end.toISOString(),
          venue: event.venue,
        })),
      })
      alert('Itinerary updated!')
      navigate('/itineraries')
    } catch (err) {
      console.error(err)
      alert('Error saving itinerary')
    }
  }

  return (
    <>
      <h2>Edit Itinerary: {itinerary?.name}</h2>
      <button onClick={handleSave}>Save Itinerary</button>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={event => handleEventDelete(event.id)}
        style={{ height: 500, margin: '50px' }}
      />
    </>
  )
}
