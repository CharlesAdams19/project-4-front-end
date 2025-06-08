import { useEffect, useState } from "react"
import { getAllItineraries } from "../../services/itineraries"

export default function ItineraryIndex() {
  const [itineraries, setItineraries] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getAllItineraries()
        setItineraries(data)
      } catch (err) {
        console.error(err)
      }
    }
    getData()
  }, [])

  return (
    <>
      <h1>All Itineraries</h1>
      <ul>
        {itineraries.map(itinerary => (
          <li key={itinerary.id}>{itinerary.name}</li>
        ))}
      </ul>
    </>
  )
}
