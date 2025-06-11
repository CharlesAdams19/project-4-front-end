// import { useState } from 'react'
// import { createItinerary } from '../../services/itineraries'
// import { Calendar } from 'react-big-calendar'
// import localizer from '../../utils/calendarLocalizer'
// import dummyShows from '../../utils/dummyShows'
// import { useNavigate } from 'react-router'
// import 'react-big-calendar/lib/css/react-big-calendar.css'

// export default function ItineraryCreate() {
//   const navigate = useNavigate()
//   const [events, setEvents] = useState([])
//   const [selectedShowId, setSelectedShowId] = useState(null)
//   const [selectedShowDate, setSelectedShowDate] = useState('')

//   const [formData, setFormData] = useState({
//     name: '',
//   })

//   const [calendarView, setCalendarView] = useState('month')
//   const [calendarDate, setCalendarDate] = useState(new Date())

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value })
//   }

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

//   const handleEventDelete = (eventId) => {
//     if (window.confirm('Delete this event?')) {
//       setEvents(events.filter((event) => event.id !== eventId))
//     }
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     try {
//       await createItinerary({
//         ...formData,
//         itinerary_items: events.map((event) => ({
//           id: event.id,
//           show_name: event.title,
//           start: event.start.toISOString(),
//           end: event.end.toISOString(),
//           venue: event.venue,
//         })),
//       })
//       console.log('Itinerary created!')
//       navigate('/itineraries')
//     } catch (err) {
//       console.error(err.response ? err.response.data : err)
//     }
//   }

//   const selectedShow = dummyShows.find((s) => s.id === parseInt(selectedShowId))

//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <h2>Create Itinerary</h2>
//         <input
//           name="name"
//           placeholder="Name"
//           value={formData.name}
//           onChange={handleChange}
//         />
//         <button type="submit">Save Itinerary</button>
//       </form>

//       <div style={{ display: 'flex', marginTop: '20px' }}>

//         <div style={{ width: '30%', padding: '10px', borderRight: '1px solid #ccc' }}>
//           <h3>Search Shows</h3>
//           <select
//             value={selectedShowId || ''}
//             onChange={(e) => setSelectedShowId(e.target.value)}
//           >
//             <option value="" disabled>
//               Select a show
//             </option>
//             {dummyShows.map((show) => (
//               <option key={show.id} value={show.id}>
//                 {show.name}
//               </option>
//             ))}
//           </select>

//           {selectedShow && (
//             <div style={{ marginTop: '10px' }}>
//               <p>
//                 <strong>Venue:</strong> {selectedShow.venue}
//               </p>
//               <p>
//                 <strong>Time:</strong> {selectedShow.time}
//               </p>
//               <label>
//                 Select date:{' '}
//                 <select
//                   value={selectedShowDate}
//                   onChange={(e) => setSelectedShowDate(e.target.value)}
//                 >
//                   <option value="" disabled>
//                     Select date
//                   </option>
//                   {selectedShow.dates.map((date) => (
//                     <option key={date} value={date}>
//                       {date}
//                     </option>
//                   ))}
//                 </select>
//               </label>
//               <button
//                 type="button"
//                 style={{ display: 'block', marginTop: '10px' }}
//                 onClick={handleAddToCalendar}
//               >
//                 Add to Calendar
//               </button>
//             </div>
//           )}
//         </div>

//         <div style={{ flexGrow: 1, padding: '10px' }}>
//           <Calendar
//             localizer={localizer}
//             events={events}
//             startAccessor="start"
//             endAccessor="end"
//             selectable
//             onSelectEvent={(event) => handleEventDelete(event.id)}

//             view={calendarView}
//             onView={setCalendarView}
//             date={calendarDate}
//             onNavigate={setCalendarDate}
//             style={{ height: 600 }}
//           />
//         </div>
//       </div>
//     </>
//   )
// }
