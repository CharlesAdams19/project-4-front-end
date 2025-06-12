
// import { useState, useEffect, useContext } from "react"
// import { Calendar } from "react-big-calendar"
// import localizer from "../../utils/calendarLocalizer"
// import { getAllShows } from '../../services/shows'
// import { toast, ToastContainer } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
// import {
//   getUserItineraries,
//   getSingleItinerary,
//   updateItinerary,
//   createItinerary,
//   deleteItinerary,
// } from "../../services/itineraries"
// import { useNavigate } from "react-router"
// import { UserContext } from "../../contexts/UserContext"
// import "react-big-calendar/lib/css/react-big-calendar.css"
// import { useParams } from 'react-router'

// export default function ItineraryEdit() {
//   const navigate = useNavigate()
//   const { user } = useContext(UserContext)

//   const [userItineraries, setUserItineraries] = useState([])
//   const [selectedItineraryId, setSelectedItineraryId] = useState('new')
//   const [selectedItineraryName, setSelectedItineraryName] = useState("")
//   const [events, setEvents] = useState([])
//   const [selectedShowId, setSelectedShowId] = useState(null)
//   const [selectedShowDate, setSelectedShowDate] = useState("")
//   const [calendarView, setCalendarView] = useState("month")
//   const [calendarDate, setCalendarDate] = useState(new Date())
//   const { itineraryId } = useParams()
//   console.log('itineraryId from URL:', itineraryId)

//   // Fetch user itineraries
//   useEffect(() => {
//     async function fetchUserItineraries() {
//       try {
//         const data = await getUserItineraries()
//         setUserItineraries(data)

//         // After itineraries loaded → sync selectedItineraryId
//         if (itineraryId && itineraryId !== 'new') {
//           setSelectedItineraryId(itineraryId)
//         } else {
//           setSelectedItineraryId('new')
//         }
//       } catch (err) {
//         console.error("Error fetching user itineraries", err)
//       }
//     }

//     if (user) {
//       fetchUserItineraries()
//     }
//   }, [user, itineraryId])

//   // Fetch selected itinerary
//   useEffect(() => {
//     async function fetchSelectedItinerary() {
//       if (!selectedItineraryId || selectedItineraryId === 'new') {
//         setSelectedItineraryName("")
//         setEvents([])
//         return
//       }
//       try {
//         const data = await getSingleItinerary(selectedItineraryId)
//         setSelectedItineraryName(data.name || "")
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
//         console.error("Error fetching selected itinerary", err)
//       }
//     }
//     fetchSelectedItinerary()
//   }, [selectedItineraryId])

//   const handleAddToCalendar = () => {
//     if (!selectedShowId || !selectedShowDate) {
//       alert("Please select a show and date")
//       return
//     }
//     const show = dummyShows.find((s) => s.id === parseInt(selectedShowId))
//     if (!show) return
//     const startDateTime = new Date(`${selectedShowDate}T${show.time}`)
//     const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000)
//     const newEvent = {
//       id: Date.now(),
//       title: show.name,
//       start: startDateTime,
//       end: endDateTime,
//       venue: show.venue,
//     }
//     setEvents([...events, newEvent])
//   }

//   const handleEventDelete = (eventId) => {
//     if (window.confirm("Delete this event?")) {
//       setEvents(events.filter((event) => event.id !== eventId))
//     }
//   }

//   const handleSave = async () => {
//     try {
//       if (selectedItineraryId && selectedItineraryId !== 'new') {
//         await updateItinerary(selectedItineraryId, {
//           itinerary_items: events.map((event) => ({
//             id: event.id,
//             show_name: event.title,
//             start: event.start.toISOString(),
//             end: event.end.toISOString(),
//             venue: event.venue,
//           })),
//         })
// toast.success("Itinerary updated!")

//       } else {
//         const response = await createItinerary({
//           name: selectedItineraryName || "Untitled",
//           itinerary_items: events.map((event) => ({
//             id: event.id,
//             show_name: event.title,
//             start: event.start.toISOString(),
//             end: event.end.toISOString(),
//             venue: event.venue,
//           })),
//         })
//         setSelectedItineraryId(response.id)
//       toast.success("Itinerary created!")
//       }
//       // navigate("/itineraries")
//     } catch (err) {
//       console.error("Error saving itinerary", err)
//       alert("Error saving itinerary")
//     }
//   }

//   const handleDelete = async () => {
//     if (!selectedItineraryId || selectedItineraryId === 'new') return
//     if (!window.confirm("Delete this itinerary?")) return
//     try {
//       await deleteItinerary(selectedItineraryId)
//       toast.success("Itinerary deleted!")
//       setTimeout(() => {
//   navigate("/itineraries")
// }, 1500)
//       setSelectedItineraryId('new')
//       setSelectedItineraryName("")
//       setEvents([])
//       setTimeout(() => {
//   navigate("/itineraries")
// }, 1000)
//     } catch (err) {
//       console.error("Error deleting itinerary", err)
//     }
//   }

// return (
//   <>
//     <h2 style={{ textAlign: 'center' }}>Create / Edit Itinerary</h2>

//     <div style={{ textAlign: 'center', marginBottom: '10px' }}>
//       <label>
//         Select itinerary:{" "}
//         <select
//           value={selectedItineraryId}
//           onChange={(e) => setSelectedItineraryId(e.target.value)}
//         >
//           <option value="new">Create new itinerary</option>
//           {userItineraries.map((itin) => (
//             <option key={itin.id} value={itin.id}>
//               {itin.name}
//             </option>
//           ))}
//         </select>
//       </label>
//     </div>

//     {/* Itinerary Name */}
//     {selectedItineraryId === 'new' ? (
//       <div style={{ textAlign: 'center', marginBottom: '15px' }}>
//         <label>
//           Itinerary name:{" "}
//           <input
//             type="text"
//             value={selectedItineraryName}
//             onChange={(e) => setSelectedItineraryName(e.target.value)}
//             style={{
//               padding: '5px',
//               borderRadius: '4px',
//               border: '1px solid #ccc',
//               width: '200px'
//             }}
//           />
//         </label>
//       </div>
//     ) : (
//       <div style={{ textAlign: 'center', marginBottom: '15px' }}>
//         <strong>Itinerary name:</strong> {selectedItineraryName}
//       </div>
//     )}

//     {/* Main layout */}
//     <div
//       style={{
//         display: "flex",
//         gap: "20px",
//         alignItems: "flex-start",
//         padding: "0 20px"
//       }}
//     >
//       {/* Left sidebar - Search Shows */}
//       <div
//         style={{
//           border: "1px solid #ccc",
//           borderRadius: "8px",
//           padding: "15px",
//           backgroundColor: "#fafafa",
//           width: "300px",
//           minHeight: "400px"
//         }}
//       >
//         <h3 style={{ marginTop: 0 }}>Search Shows</h3>
//         <select
//           value={selectedShowId || ""}
//           onChange={(e) => setSelectedShowId(e.target.value)}
//           style={{
//             width: "100%",
//             padding: "5px",
//             marginBottom: "10px"
//           }}
//         >
//           <option value="" disabled>
//             Select a show
//           </option>
//           {dummyShows.map((show) => (
//             <option key={show.id} value={show.id}>
//               {show.name}
//             </option>
//           ))}
//         </select>

//         {selectedShowId && (
//           <div>
//             <p>
//               <strong>Venue:</strong>{" "}
//               {dummyShows.find((s) => s.id === parseInt(selectedShowId)).venue}
//             </p>
//             <p>
//               <strong>Time:</strong>{" "}
//               {dummyShows.find((s) => s.id === parseInt(selectedShowId)).time}
//             </p>
//             <label>
//               Select date:{" "}
//               <select
//                 value={selectedShowDate}
//                 onChange={(e) => setSelectedShowDate(e.target.value)}
//                 style={{
//                   width: "100%",
//                   padding: "5px",
//                   marginBottom: "10px"
//                 }}
//               >
//                 <option value="" disabled>
//                   Select date
//                 </option>
//                 {dummyShows
//                   .find((s) => s.id === parseInt(selectedShowId))
//                   .dates.map((date) => (
//                     <option key={date} value={date}>
//                       {date}
//                     </option>
//                   ))}
//               </select>
//             </label>
//             <button
//               type="button"
//               style={{
//                 display: "block",
//                 width: "100%",
//                 padding: "8px",
//                 marginTop: "10px",
//                 backgroundColor: "#007bff",
//                 color: "#fff",
//                 border: "none",
//                 borderRadius: "4px",
//                 cursor: "pointer"
//               }}
//               onClick={handleAddToCalendar}
//             >
//               Add to Calendar
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Right side - Calendar */}
//       <div style={{ flexGrow: 1 }}>
//         <Calendar
//           localizer={localizer}
//           events={events}
//           startAccessor="start"
//           endAccessor="end"
//           selectable
//           onSelectEvent={(event) => handleEventDelete(event.id)}
//           style={{ height: 600 }}
//           view={calendarView}
//           onView={setCalendarView}
//           date={calendarDate}
//           onNavigate={setCalendarDate}
//         />

//         {/* Buttons */}
//         <div
//           style={{
//             display: "flex",
//             gap: "10px",
//             justifyContent: "flex-end",
//             marginTop: "10px"
//           }}
//         >
//           <button
//             style={{
//               padding: "8px 16px",
//               backgroundColor: "#28a745",
//               color: "#fff",
//               border: "none",
//               borderRadius: "4px",
//               cursor: "pointer"
//             }}
//             onClick={handleSave}
//           >
//             Save Itinerary
//           </button>

//           {selectedItineraryId !== "new" && (
//             <button
//               style={{
//                 padding: "8px 16px",
//                 backgroundColor: "crimson",
//                 color: "#fff",
//                 border: "none",
//                 borderRadius: "4px",
//                 cursor: "pointer"
//               }}
//               onClick={handleDelete}
//             >
//               Delete Itinerary
//             </button>
//           )}
//         </div>
//       </div>
//     </div>

//     {/* Toast container */}
//     <ToastContainer position="top-center" autoClose={2000} />
//   </>
// )
// }

import { useState, useEffect, useContext } from "react"
import { Calendar } from "react-big-calendar"
import localizer from "../../utils/calendarLocalizer"
import { getAllShows } from '../../services/shows'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
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
import { useParams } from 'react-router'

export default function ItineraryEdit() {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)

  const [userItineraries, setUserItineraries] = useState([])
  const [selectedItineraryId, setSelectedItineraryId] = useState('new')
  const [selectedItineraryName, setSelectedItineraryName] = useState("")
  const [events, setEvents] = useState([])
  const [selectedShowId, setSelectedShowId] = useState(null)
  const [selectedShowDate, setSelectedShowDate] = useState("")
  const [calendarView, setCalendarView] = useState("month")
  const [calendarDate, setCalendarDate] = useState(new Date())
  const { itineraryId } = useParams()
  const [selectedItineraryUserId, setSelectedItineraryUserId] = useState(null)
  const isOwner = user && selectedItineraryUserId === user.id

  const [shows, setShows] = useState([])

  // Fetch shows from backend
  useEffect(() => {
    async function fetchShows() {
      try {
        const data = await getAllShows()
        setShows(data)
      } catch (err) {
        console.error("Error fetching shows", err)
      }
    }
    fetchShows()
  }, [])

  // Fetch user itineraries
  useEffect(() => {
    async function fetchUserItineraries() {
      try {
        const data = await getUserItineraries()
        setUserItineraries(data)

        if (itineraryId && itineraryId !== 'new') {
          setSelectedItineraryId(itineraryId)
        } else {
          setSelectedItineraryId('new')
        }
      } catch (err) {
        console.error("Error fetching user itineraries", err)
      }
    }

    if (user) {
      fetchUserItineraries()
    }
  }, [user, itineraryId])

  // Fetch selected itinerary
  useEffect(() => {
    async function fetchSelectedItinerary() {
      if (!selectedItineraryId || selectedItineraryId === 'new') {
        setSelectedItineraryName("")
        setEvents([])
        return
      }
      try {
        const data = await getSingleItinerary(selectedItineraryId)
        setSelectedItineraryName(data.name || "")
        setSelectedItineraryUserId(data.user.id)
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
    const show = shows.find((s) => s.id === parseInt(selectedShowId))
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
      if (selectedItineraryId && selectedItineraryId !== 'new') {
        await updateItinerary(selectedItineraryId, {
          itinerary_items: events.map((event) => ({
            id: event.id,
            show_name: event.title,
            start: event.start.toISOString(),
            end: event.end.toISOString(),
            venue: event.venue,
          })),
        })
        toast.success("Itinerary updated!")
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
        toast.success("Itinerary created!")
      }
    } catch (err) {
      console.error("Error saving itinerary", err)
      alert("Error saving itinerary")
    }
  }

  const handleDelete = async () => {
    if (!selectedItineraryId || selectedItineraryId === 'new') return
    if (!window.confirm("Delete this itinerary?")) return
    try {
      await deleteItinerary(selectedItineraryId)
      toast.success("Itinerary deleted!")
      setTimeout(() => {
        navigate("/itineraries")
      }, 1500)
      setSelectedItineraryId('new')
      setSelectedItineraryName("")
      setEvents([])
    } catch (err) {
      console.error("Error deleting itinerary", err)
    }
  }

  return (
    <>
      <h2 style={{ textAlign: 'center' }}>Create / Edit Itinerary</h2>

      <div style={{ textAlign: 'center', marginBottom: '10px' }}>
        <label>
          Select itinerary:{" "}
          <select
            value={selectedItineraryId}
            onChange={(e) => setSelectedItineraryId(e.target.value)}
          >
            <option value="new">Create new itinerary</option>
            {userItineraries.map((itin) => (
              <option key={itin.id} value={itin.id}>
                {itin.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Itinerary Name */}
      {selectedItineraryId === 'new' ? (
        <div style={{ textAlign: 'center', marginBottom: '15px' }}>
          <label>
            Itinerary name:{" "}
            <input
              type="text"
              value={selectedItineraryName}
              onChange={(e) => setSelectedItineraryName(e.target.value)}
              style={{
                padding: '5px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                width: '200px'
              }}
            />
          </label>
        </div>
      ) : (
        <div style={{ textAlign: 'center', marginBottom: '15px' }}>
          <strong>Itinerary name:</strong> {selectedItineraryName}
        </div>
      )}

      {!isOwner && selectedItineraryId !== 'new' && (
        <p style={{ textAlign: 'center', color: 'gray', fontStyle: 'italic' }}>
          You are viewing another user's itinerary. Editing is disabled.
        </p>
      )}


      {/* Main layout */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "flex-start",
          padding: "0 20px"
        }}
      >
        {/* Left sidebar - Search Shows */}
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "15px",
            backgroundColor: "#fafafa",
            width: "300px",
            minHeight: "400px"
          }}
        >
          <h3 style={{ marginTop: 0 }}>Search Shows</h3>
          <select
            value={selectedShowId || ""}
            onChange={(e) => setSelectedShowId(e.target.value)}
            style={{
              width: "100%",
              padding: "5px",
              marginBottom: "10px"
            }}
          >
            <option value="" disabled>
              Select a show
            </option>
            {shows.map((show) => (
              <option key={show.id} value={show.id}>
                {show.name}
              </option>
            ))}
          </select>

          {selectedShowId && (
            <div>
              <p>
                <strong>Venue:</strong>{" "}
                {shows.find((s) => s.id === parseInt(selectedShowId)).venue}
              </p>
              <p>
                <strong>Time:</strong>{" "}
                {shows.find((s) => s.id === parseInt(selectedShowId)).time}
              </p>
              <label>
                Select date:{" "}
                <select
                  value={selectedShowDate}
                  onChange={(e) => setSelectedShowDate(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "5px",
                    marginBottom: "10px"
                  }}
                >
                  <option value="" disabled>
                    Select date
                  </option>
                  {shows
                    .find((s) => s.id === parseInt(selectedShowId))
                    .dates.map((date) => (
                      <option key={date} value={date}>
                        {date}
                      </option>
                    ))}
                </select>
              </label>
              {isOwner && (
                <button
                  type="button"
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "8px",
                    marginTop: "10px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"
                  }}
                  onClick={handleAddToCalendar}
                >
                  Add to Calendar
                </button>
              )}
            </div>
          )}
        </div>

        {/* Right side - Calendar */}
        <div style={{ flexGrow: 1 }}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            selectable
            onSelectEvent={(event) => {
              if (isOwner) {
                handleEventDelete(event.id)
              }
            }}
            style={{ height: 600 }}
            view={calendarView}
            onView={setCalendarView}
            date={calendarDate}
            onNavigate={setCalendarDate}
          />

          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "flex-end",
              marginTop: "10px"
            }}
          >
            {isOwner && (
              <button
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#28a745",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
                onClick={handleSave}
              >
                Save Itinerary
              </button>
            )}

            {isOwner && selectedItineraryId !== "new" && (
              <button
                style={{
                  padding: "8px 16px",
                  backgroundColor: "crimson",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
                onClick={handleDelete}
              >
                Delete Itinerary
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Toast container */}
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  )
}
