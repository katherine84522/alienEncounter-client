import SightingCard from './SightingCard'
import { useState, useEffect } from 'react'

export default function Sighting({ sightings, setSightings }) {

    const [sort, setSort] = useState(false)

    const sortedSightings = sightings.sort((a, b) => a.likecount > b.likecount ? -1 : 1)

    const handleSort = () => {
        setSort(true)
        console.log(sort)
    }

    useEffect(() => {
        const request = async () => {
            let req = await fetch("http://localhost:3000/reports")
            let res = await req.json()
            setSightings(res)
            console.log(res)

        }

        request()
    }, [])

    console.log(sightings)
    return (
        <div>
            <button className="sortButton" onClick={() => { handleSort() }}>Sort by popularity</button>
            <div className="sighting">
                {sort ? (
                    sortedSightings.map((sighting) => {
                        return (
                            <SightingCard sighting={sighting} />
                        )
                    })
                ) : (
                    sightings.map((sighting) => {
                        return (
                            <SightingCard sighting={sighting} />
                        )
                    })
                )
                }
            </div>
        </div>
    )
}
