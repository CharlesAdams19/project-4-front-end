import { useState, useEffect, useContext } from 'react'
import { Calendar } from 'react-big-calendar'
import localizer from '../../utils/calendarLocalizer'
import {
  getUserItineraries,
  getSingleItinerary,
  updateItinerary,
  deleteItinerary,
} from '../../services/itineraries'
import { useNavigate } from 'react-router'
import { UserContext } from '../../contexts/UserContext'
import dummyShows from '../../utils/dummyShows'

import 'react-big-calendar/lib/css/react-big-calendar.css'

export default function ItineraryEdit() {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)

  const [userItineraries, setUserItineraries] = useState([])
  const [selectedItineraryId, setSelectedItineraryId] = useState('')
  const [selectedItineraryName, setSelectedItineraryName] = useState('')
  const [events, setEvents] = useState([])

  // controlled calendar state:
  const [view, setView] = useState('month')
  const [date, setDate] = useState(new Date())

  // search show state:
  const [selectedShowId, setSelectedShowId] = useState(null)
  const [selectedShowDate, setSelectedShowDate] = useState('')

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

  const handleDeleteItinerary = async () => {
    if (!selectedItineraryId) {
      alert('Please select an itinerary to delete')
      return
    }

    if (window.confirm('Are you sure you want to delete this itinerary?')) {
      try {
        await deleteItinerary(selectedItineraryId)
        alert('Itinerary deleted!')
        setSelectedItineraryId('')
        setSelectedItineraryName('')
        setEvents([])
        // Refresh user itineraries list
        const data = await getUserItineraries()
        setUserItineraries(data)
      } catch (err) {
        console.error('Error deleting itinerary', err)
        alert('Error deleting itinerary')
      }
    }
  }

  const handleAddToCalendar = () => {
    if (!selectedShowId || !selectedShowDate) {
      alert('Please select a show and date')
      return
    }

    const selectedShow = dummyShows.find((s) => s.id === parseInt(selectedShowId))
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

  const selectedShow = dummyShows.find((s) => s.id === parseInt(selectedShowId))

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
                {dummyShows.map((show) => (
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
                view={view}
                onView={setView}
                date={date}
                onNavigate={setDate}
                onSelectEvent={(event) => handleEventDelete(event.id)}
                style={{ height: 600 }}
              />
            </div>
          </div>

          {/* Save + Delete buttons */}
          <div style={{ marginTop: '10px' }}>
            <button onClick={handleSave} style={{ marginRight: '10px' }}>
              Save Itinerary
            </button>
            <button onClick={handleDeleteItinerary} style={{ backgroundColor: 'red', color: 'white' }}>
              Delete Itinerary
            </button>
          </div>
        </>
      )}
    </>
  )
}
