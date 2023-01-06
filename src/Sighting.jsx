import { useNavigate } from "react-router-dom"
import SightingCard from './SightingCard'

export default function Sighting({ sightings, setSightings }) {
    const navigate = useNavigate();



    const handleSort = () => {
        const sortedSightings = sightings.sort((a, b) => a.likecount > b.likecount ? -1 : 1)
        setSightings(sortedSightings)
        console.log(sortedSightings)
    }


    return (
        <div>
            <button className="sortButton" onClick={() => { handleSort() }}>Sort by popularity</button>
            <div className="sighting">
                {
                    sightings.map((sighting) => {
                        return (
                            < SightingCard sighting={sighting} />
                        )
                    })
                }
            </div>
        </div>
    )
}