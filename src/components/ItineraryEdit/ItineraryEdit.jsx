import { useState, useEffect } from 'react'
import { Calendar } from 'react-big-calendar'
import localizer from '../../utils/calendarLocalizer'
import { getUserItineraries, getSingleItinerary, updateItinerary } from '../../services/itineraries'
import { useNavigate } from 'react-router'
import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import DUMMY_SHOWS from '../../utils/dummyShows'

import 'react-big-calendar/lib/css/react-big-calendar.css'

export default function ItineraryEdit() {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)

  const [userItineraries, setUserItineraries] = useState([])
  const [selectedItineraryId, setSelectedItineraryId] = useState('')
  const [selectedItineraryName, setSelectedItineraryName] = useState('')
  const [events, setEvents] = useState([])

  const [calendarView, setCalendarView] = useState('month')
  const [calendarDate, setCalendarDate] = useState(new Date())

  const [selectedShowId, setSelectedShowId] = useState(null)
  const [selectedShowDate, setSelectedShowDate] = useState('')

  // Fetch user itineraries
  useEffect(() => {
    async function fetchUserItineraries() {
      try {
        const data = await getUserItineraries()
        setUserItineraries(data)
      } catch (err) {
        console.error('Error fetching user itineraries', err)
      }
    }
    if (user) {
      fetchUserItineraries()
    }
  }, [user])

  // Fetch itinerary items when selectedItineraryId changes
  useEffect(() => {
    async function fetchSelectedItinerary() {
      if (!selectedItineraryId) return
      try {
        const data = await getSingleItinerary(selectedItineraryId)
        setSelectedItineraryName(data.name || '')
        setEvents(
          data.itinerary_items.map((item) => ({
            id: item.id,
            title: item.show_name,
            start: new Date(item.start),
            end: new Date(item.end),
            venue: item.venue,
          }))
        )
      } catch (err) {
        console.error('Error fetching selected itinerary', err)
      }
    }
    fetchSelectedItinerary()
  }, [selectedItineraryId])

  const handleEventDelete = (eventId) => {
    if (window.confirm('Delete this event?')) {
      setEvents(events.filter((event) => event.id !== eventId))
    }
  }

  const handleSave = async () => {
    if (!selectedItineraryId) {
      alert('Please select an itinerary to save')
      return
    }

    try {
      await updateItinerary(selectedItineraryId, {
        itinerary_items: events.map((event) => ({
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
      console.error('Error saving itinerary', err)
      alert('Error saving itinerary')
    }
  }

  const handleAddToCalendar = () => {
    if (!selectedShowId || !selectedShowDate) {
      alert('Please select a show and date')
      return
    }

    const selectedShow = DUMMY_SHOWS.find((s) => s.id === parseInt(selectedShowId))
    if (!selectedShow) return

    const startDateTime = new Date(`${selectedShowDate}T${selectedShow.time}`)
    const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000) // +1 hour

    const newEvent = {
      id: Date.now(),
      title: selectedShow.name,
      start: startDateTime,
      end: endDateTime,
      venue: selectedShow.venue,
    }

    setEvents([...events, newEvent])
  }

  const selectedShow = DUMMY_SHOWS.find((s) => s.id === parseInt(selectedShowId))

  return (
    <>
      <h2>Edit Itinerary</h2>

      <label>
        Select your itinerary:{' '}
        <select
          value={selectedItineraryId}
          onChange={(e) => setSelectedItineraryId(e.target.value)}
        >
          <option value="">Select an itinerary</option>
          {userItineraries.map((itin) => (
            <option key={itin.id} value={itin.id}>
              {itin.name}
            </option>
          ))}
        </select>
      </label>

      {selectedItineraryId && (
        <>
          <h3>Editing: {selectedItineraryName}</h3>

          <div style={{ display: 'flex', marginTop: '20px' }}>
            {/* Left side: Show search */}
            <div style={{ width: '30%', padding: '10px', borderRight: '1px solid #ccc' }}>
              <h3>Search Shows</h3>
              <select
                value={selectedShowId || ''}
                onChange={(e) => setSelectedShowId(e.target.value)}
              >
                <option value="" disabled>
                  Select a show
                </option>
                {DUMMY_SHOWS.map((show) => (
                  <option key={show.id} value={show.id}>
                    {show.name}
                  </option>
                ))}
              </select>

              {selectedShow && (
                <div style={{ marginTop: '10px' }}>
                  <p>
                    <strong>Venue:</strong> {selectedShow.venue}
                  </p>
                  <p>
                    <strong>Time:</strong> {selectedShow.time}
                  </p>
                  <label>
                    Select date:{' '}
                    <select
                      value={selectedShowDate}
                      onChange={(e) => setSelectedShowDate(e.target.value)}
                    >
                      <option value="" disabled>
                        Select date
                      </option>
                      {selectedShow.dates.map((date) => (

                        <option key={date} value={date}>
                          {date}
                        </option>
                      ))}
                    </select>
                  </label>
                  <button
                    type="button"
                    style={{ display: 'block', marginTop: '10px' }}
                    onClick={handleAddToCalendar}
                  >
                    Add to Calendar
                  </button>
                </div>
              )}
            </div>

            {/* Right side: Calendar */}
            <div style={{ flexGrow: 1, padding: '10px' }}>
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                selectable
                view={calendarView}
                onView={(view) => setCalendarView(view)}
                date={calendarDate}
                onNavigate={(date) => setCalendarDate(date)}
                onSelectEvent={(event) => handleEventDelete(event.id)}
                style={{ height: 600 }}
              />
              <button style={{ marginTop: '10px' }} onClick={handleSave}>
                Save Itinerary
              </button>
            </div>
          </div>
        </>
      )}
    </>
  )
}
