// import { useEffect, useState } from "react"
// import { getAllItineraries } from "../../services/itineraries"

// export default function ItineraryIndex() {
//   const [itineraries, setItineraries] = useState([])

//   useEffect(() => {
//     const getData = async () => {
//       try {
//         const data = await getAllItineraries()
//         setItineraries(data)
//       } catch (err) {
//         console.error(err)
//       }
//     }
//     getData()
//   }, [])

//   return (
//     <>
//       <h1>All Itineraries</h1>
//       <ul>
//         {itineraries.map(itinerary => (
//           <li key={itinerary.id}>{itinerary.name}</li>
//         ))}
//       </ul>
//     </>
//   )
// }

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { getAllItineraries } from '../../services/itineraries'
import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'

export default function ItineraryIndex() {
  const { user } = useContext(UserContext)
  const navigate = useNavigate()
  const [allItineraries, setAllItineraries] = useState([])

  useEffect(() => {
    async function fetchItineraries() {
      try {
        const data = await getAllItineraries()
        setAllItineraries(data)
      } catch (err) {
        console.error('Error fetching all itineraries:', err)
      }
    }
    fetchItineraries()
  }, [])

  const handleEditClick = (itineraryId) => {
    navigate(`/itineraries/edit?itineraryId=${itineraryId}`)
  }

  const handleCreateClick = () => {
    navigate('/itineraries/edit') // No query param → create mode
  }

  return (
    <>
      <h2>All Itineraries</h2>
      <button onClick={handleCreateClick}>+ Create New Itinerary</button>

      <div style={{ marginTop: '20px' }}>
        {allItineraries.length === 0 ? (
          <p>No itineraries found.</p>
        ) : (
          allItineraries.map((itin) => (
            <div
              key={itin.id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '5px',
                padding: '10px',
                marginBottom: '10px',
              }}
            >
              <h3>{itin.name}</h3>
              <p>
                <strong>Owner:</strong> {itin.user?.username || 'Unknown'}
              </p>
              <p>
                <strong># of Shows:</strong> {itin.itinerary_items.length}
              </p>
              {itin.itinerary_items.length > 0 && (
                <p>
                  <strong>First Show:</strong> {itin.itinerary_items[0].show_name} at{' '}
                  {itin.itinerary_items[0].venue}
                </p>
              )}

              <button onClick={() => handleEditClick(itin.id)}>
                {user && user.id === itin.user?.id ? 'Edit' : 'View'} Itinerary
              </button>
            </div>
          ))
        )}
      </div>
    </>
  )
}

