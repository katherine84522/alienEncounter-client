import SightingCard from './SightingCard'
import { useState, useEffect } from 'react'
export default function Sighting({ sightings, setSightings, handleSort }) {
    return (
        <div>
            {/* <button className="sortButton" onClick={() => { handleSort() }}>Sort by popularity</button> */}
            <div className="sighting">
                {
                    sightings.map((sighting) => {
                        return (
                            <SightingCard key={sighting.id} sighting={sighting} />
                        )
                    })
                }
            </div>
        </div>
    )
}


// {
//     sort ? (
//         sortedSightings.map((sighting) => {
//             return (
//                 <SightingCard sighting={sighting} />
//             )
//         })
//     ) : (
//         sightings.map((sighting) => {
//             return (
//                 <SightingCard sighting={sighting} />
//             )
//         })
//     )
// }