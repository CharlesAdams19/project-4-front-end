

// import { useState, useEffect, useContext } from 'react'
// import { Calendar } from 'react-big-calendar'
// import localizer from '../../utils/calendarLocalizer'
// import { getAllItineraries, getSingleItinerary, updateItinerary, createItinerary, deleteItinerary } from '../../services/itineraries'
// import { useNavigate } from 'react-router'
// import { UserContext } from '../../contexts/UserContext'
// import dummyShows from '../../utils/dummyShows'
// import 'react-big-calendar/lib/css/react-big-calendar.css'
// import { useSearchParams } from 'react-router'

// export default function ItineraryEdit() {
//   const navigate = useNavigate()
//   const { user } = useContext(UserContext)

//   const [allItineraries, setAllItineraries] = useState([])
//   // const [selectedItineraryId, setSelectedItineraryId] = useState('')
//   const [searchParams] = useSearchParams()
//   const initialItineraryId = searchParams.get('itineraryId') || ''
//   const [selectedItineraryId, setSelectedItineraryId] = useState(initialItineraryId)
//   const [selectedItineraryName, setSelectedItineraryName] = useState('')
//   const [events, setEvents] = useState([])
//   const [selectedShowId, setSelectedShowId] = useState(null)
//   const [selectedShowDate, setSelectedShowDate] = useState('')

//   // Calendar view state (KEEPING THIS FIX!)
//   const [calendarView, setCalendarView] = useState('month')
//   const [calendarDate, setCalendarDate] = useState(new Date())

//   // Fetch all itineraries (for dropdown)
//   useEffect(() => {
//     async function fetchAllItineraries() {
//       try {
//         const data = await getAllItineraries()
//         setAllItineraries(data)
//       } catch (err) {
//         console.error('Error fetching itineraries', err)
//       }
//     }
//     fetchAllItineraries()
//   }, [])

//   // Fetch itinerary items when selectedItineraryId changes
//   useEffect(() => {
//     async function fetchSelectedItinerary() {
//       if (!selectedItineraryId || selectedItineraryId === 'new') {
//         setSelectedItineraryName('')
//         setEvents([])
//         return
//       }
//       try {
//         const data = await getSingleItinerary(selectedItineraryId)
//         setSelectedItineraryName(data.name || '')
//         setEvents(
//           data.itinerary_items.map((item) => ({
//             id: item.id,
//             title: item.show_name,
//             start: new Date(item.start),
//             end: new Date(item.end),
//             venue: item.venue,
//           }))
//         )
//       } catch (err) {
//         console.error('Error fetching selected itinerary', err)
//       }
//     }
//     fetchSelectedItinerary()
//   }, [selectedItineraryId])

//   // Add show to calendar
//   const handleAddToCalendar = () => {
//     if (!selectedShowId || !selectedShowDate) {
//       alert('Please select a show and date')
//       return
//     }

//     const selectedShow = dummyShows.find((s) => s.id === parseInt(selectedShowId))
//     if (!selectedShow) return

//     const startDateTime = new Date(`${selectedShowDate}T${selectedShow.time}`)
//     const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000) // +1 hour

//     const newEvent = {
//       id: Date.now(),
//       title: selectedShow.name,
//       start: startDateTime,
//       end: endDateTime,
//       venue: selectedShow.venue,
//     }

//     setEvents([...events, newEvent])
//   }

//   // Delete event from calendar
//   const handleEventDelete = (eventId) => {
//     if (window.confirm('Delete this event?')) {
//       setEvents(events.filter((event) => event.id !== eventId))
//     }
//   }

//   // Save itinerary
//   const handleSave = async () => {
//     try {
//       if (!selectedItineraryId || selectedItineraryId === 'new') {
//         // Creating new itinerary
//         const newItinerary = await createItinerary({
//           name: selectedItineraryName || 'Untitled Itinerary',
//           itinerary_items: events.map((event) => ({
//             id: event.id,
//             show_name: event.title,
//             start: event.start.toISOString(),
//             end: event.end.toISOString(),
//             venue: event.venue,
//           })),
//         })
//         alert('New itinerary created!')
//         navigate('/itineraries')
//       } else {
//         // Updating existing itinerary
//         await updateItinerary(selectedItineraryId, {
//           itinerary_items: events.map((event) => ({
//             id: event.id,
//             show_name: event.title,
//             start: event.start.toISOString(),
//             end: event.end.toISOString(),
//             venue: event.venue,
//           })),
//         })
//         alert('Itinerary updated!')
//         navigate('/itineraries')
//       }
//     } catch (err) {
//       console.error('Error saving itinerary', err)
//       alert('Error saving itinerary')
//     }
//   }

//   // Delete itinerary
//   const handleDeleteItinerary = async () => {
//     if (!selectedItineraryId || selectedItineraryId === 'new') {
//       alert('Cannot delete a new (unsaved) itinerary.')
//       return
//     }

//     if (window.confirm('Are you sure you want to delete this itinerary?')) {
//       try {
//         await deleteItinerary(selectedItineraryId)
//         alert('Itinerary deleted!')
//         setSelectedItineraryId('')
//         setSelectedItineraryName('')
//         setEvents([])
//       } catch (err) {
//         console.error('Error deleting itinerary', err)
//         alert('Error deleting itinerary')
//       }
//     }
//   }

//   const selectedShow = dummyShows.find((s) => s.id === parseInt(selectedShowId))

//   return (
//     <>
//       <h2>Create / Edit Itinerary</h2>

//       <label>
//         Select itinerary:{' '}
//         <select
//           value={selectedItineraryId}
//           onChange={(e) => setSelectedItineraryId(e.target.value)}
//         >
//           <option value="">Select an itinerary</option>
//           <option value="new">Create new itinerary</option>
//           {allItineraries.map((itin) => (
//             <option key={itin.id} value={itin.id}>
//               {itin.name}
//             </option>
//           ))}
//         </select>
//       </label>

//       {/* If selectedItineraryId is new OR existing, show rest of the UI */}
//       {selectedItineraryId && (
//         <>
//           <div style={{ marginTop: '10px' }}>
//             <label>
//               Itinerary name:{' '}
//               <input
//                 type="text"
//                 value={selectedItineraryName}
//                 onChange={(e) => setSelectedItineraryName(e.target.value)}
//               />
//             </label>
//           </div>

//           <div style={{ display: 'flex', marginTop: '20px' }}>
//             {/* Left side: Show search */}
//             <div style={{ width: '30%', padding: '10px', borderRight: '1px solid #ccc' }}>
//               <h3>Search Shows</h3>
//               <select
//                 value={selectedShowId || ''}
//                 onChange={(e) => setSelectedShowId(e.target.value)}
//               >
//                 <option value="" disabled>
//                   Select a show
//                 </option>
//                 {dummyShows.map((show) => (
//                   <option key={show.id} value={show.id}>
//                     {show.name}
//                   </option>
//                 ))}
//               </select>

//               {selectedShow && (
//                 <div style={{ marginTop: '10px' }}>
//                   <p>
//                     <strong>Venue:</strong> {selectedShow.venue}
//                   </p>
//                   <p>
//                     <strong>Time:</strong> {selectedShow.time}
//                   </p>
//                   <label>
//                     Select date:{' '}
//                     <select
//                       value={selectedShowDate}
//                       onChange={(e) => setSelectedShowDate(e.target.value)}
//                     >
//                       <option value="" disabled>
//                         Select date
//                       </option>
//                       {selectedShow.dates.map((date) => (
//                         <option key={date} value={date}>
//                           {date}
//                         </option>
//                       ))}
//                     </select>
//                   </label>
//                   <button
//                     type="button"
//                     style={{ display: 'block', marginTop: '10px' }}
//                     onClick={handleAddToCalendar}
//                   >
//                     Add to Calendar
//                   </button>
//                 </div>
//               )}
//             </div>

//             {/* Right side: Calendar */}
//             <div style={{ flexGrow: 1, padding: '10px' }}>
//               <Calendar
//                 localizer={localizer}
//                 events={events}
//                 startAccessor="start"
//                 endAccessor="end"
//                 selectable
//                 onSelectEvent={(event) => handleEventDelete(event.id)}
//                 style={{ height: 600, marginTop: '20px' }}
//                 view={calendarView}
//                 onView={setCalendarView}
//                 date={calendarDate}
//                 onNavigate={setCalendarDate}
//               />
//             </div>
//           </div>

//           {/* Save + Delete buttons */}
//           <div style={{ marginTop: '10px' }}>
//             <button onClick={handleSave} style={{ marginRight: '10px' }}>
//               Save Itinerary
//             </button>
//             {selectedItineraryId !== 'new' && (
//               <button onClick={handleDeleteItinerary} style={{ color: 'red' }}>
//                 Delete Itinerary
//               </button>
//             )}
//           </div>
//         </>
//       )}
//     </>
//   )
// }

import { useState, useEffect, useContext } from "react"
import { Calendar } from "react-big-calendar"
import localizer from "../../utils/calendarLocalizer"
import dummyShows from "../../utils/dummyShows"
import {
  getUserItineraries,
  getSingleItinerary,
  updateItinerary,
  createItinerary,
  deleteItinerary,
} from "../../services/itineraries"
import { useNavigate } from "react-router"
import { UserContext } from "../../contexts/UserContext"
import "react-big-calendar/lib/css/react-big-calendar.css"

export default function ItineraryEdit() {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)

  const [userItineraries, setUserItineraries] = useState([])
  const [selectedItineraryId, setSelectedItineraryId] = useState("")
  const [selectedItineraryName, setSelectedItineraryName] = useState("")
  const [events, setEvents] = useState([])
  const [selectedShowId, setSelectedShowId] = useState(null)
  const [selectedShowDate, setSelectedShowDate] = useState("")
  const [calendarView, setCalendarView] = useState("month")
  const [calendarDate, setCalendarDate] = useState(new Date())

  useEffect(() => {
    async function fetchUserItineraries() {
      try {
        const data = await getUserItineraries()
        setUserItineraries(data)
      } catch (err) {
        console.error("Error fetching user itineraries", err)
      }
    }
    if (user) {
      fetchUserItineraries()
    }
  }, [user])

  useEffect(() => {
    async function fetchSelectedItinerary() {
      if (!selectedItineraryId) {
        setSelectedItineraryName("")
        setEvents([])
        return
      }
      try {
        const data = await getSingleItinerary(selectedItineraryId)
        setSelectedItineraryName(data.name || "")
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
        console.error("Error fetching selected itinerary", err)
      }
    }
    fetchSelectedItinerary()
  }, [selectedItineraryId])

  const handleAddToCalendar = () => {
    if (!selectedShowId || !selectedShowDate) {
      alert("Please select a show and date")
      return
    }
    const show = dummyShows.find((s) => s.id === parseInt(selectedShowId))
    if (!show) return
    const startDateTime = new Date(`${selectedShowDate}T${show.time}`)
    const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000)
    const newEvent = {
      id: Date.now(),
      title: show.name,
      start: startDateTime,
      end: endDateTime,
      venue: show.venue,
    }
    setEvents([...events, newEvent])
  }

  const handleEventDelete = (eventId) => {
    if (window.confirm("Delete this event?")) {
      setEvents(events.filter((event) => event.id !== eventId))
    }
  }

  const handleSave = async () => {
    try {
      if (selectedItineraryId) {
        await updateItinerary(selectedItineraryId, {
          itinerary_items: events.map((event) => ({
            id: event.id,
            show_name: event.title,
            start: event.start.toISOString(),
            end: event.end.toISOString(),
            venue: event.venue,
          })),
        })
        alert("Itinerary updated!")
      } else {
        const response = await createItinerary({
          name: selectedItineraryName || "Untitled",
          itinerary_items: events.map((event) => ({
            id: event.id,
            show_name: event.title,
            start: event.start.toISOString(),
            end: event.end.toISOString(),
            venue: event.venue,
          })),
        })
        setSelectedItineraryId(response.id)
        alert("Itinerary created!")
      }
      navigate("/itineraries")
    } catch (err) {
      console.error("Error saving itinerary", err)
      alert("Error saving itinerary")
    }
  }

  const handleDelete = async () => {
    if (!selectedItineraryId) return
    if (!window.confirm("Delete this itinerary?")) return
    try {
      await deleteItinerary(selectedItineraryId)
      alert("Itinerary deleted")
      setSelectedItineraryId("")
      setSelectedItineraryName("")
      setEvents([])
      navigate("/itineraries")
    } catch (err) {
      console.error("Error deleting itinerary", err)
    }
  }

  return (
    <>
      <h2>Create / Edit Itinerary</h2>

      <label>
        Select itinerary:{" "}
        <select
          value={selectedItineraryId}
          onChange={(e) => setSelectedItineraryId(e.target.value)}
        >
          <option value="">Create new itinerary</option>
          {userItineraries.map((itin) => (
            <option key={itin.id} value={itin.id}>
              {itin.name}
            </option>
          ))}
        </select>
      </label>

      <div style={{ display: "flex", marginTop: "20px" }}>
        <div style={{ width: "30%", padding: "10px", borderRight: "1px solid #ccc" }}>
          <h3>Search Shows</h3>
          <select
            value={selectedShowId || ""}
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

          {selectedShowId && (
            <div style={{ marginTop: "10px" }}>
              <p>
                <strong>Venue:</strong> {dummyShows.find((s) => s.id === parseInt(selectedShowId)).venue}
              </p>
              <p>
                <strong>Time:</strong> {dummyShows.find((s) => s.id === parseInt(selectedShowId)).time}
              </p>
              <label>
                Select date:{" "}
                <select
                  value={selectedShowDate}
                  onChange={(e) => setSelectedShowDate(e.target.value)}
                >
                  <option value="" disabled>
                    Select date
                  </option>
                  {dummyShows.find((s) => s.id === parseInt(selectedShowId)).dates.map((date) => (
                    <option key={date} value={date}>
                      {date}
                    </option>
                  ))}
                </select>
              </label>
              <button
                type="button"
                style={{ display: "block", marginTop: "10px" }}
                onClick={handleAddToCalendar}
              >
                Add to Calendar
              </button>
            </div>
          )}
        </div>

        <div style={{ flexGrow: 1, padding: "10px" }}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            selectable
            onSelectEvent={(event) => handleEventDelete(event.id)}
            style={{ height: 600 }}
            view={calendarView}
            onView={setCalendarView}
            date={calendarDate}
            onNavigate={setCalendarDate}
          />
          <button style={{ marginTop: "10px" }} onClick={handleSave}>
            Save Itinerary
          </button>
          {selectedItineraryId && (
            <button
              style={{ marginTop: "10px", marginLeft: "10px", backgroundColor: "crimson", color: "white" }}
              onClick={handleDelete}
            >
              Delete Itinerary
            </button>
          )}
        </div>
      </div>
    </>
  )
}
