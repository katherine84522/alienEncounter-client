import { useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react'

export default function Sighting() {
    const navigate = useNavigate();
    const [sightings, setSightings] = useState([])
    useEffect(() => {
        const request = async () => {
            let req = await fetch("http://localhost:3000/reports")
            let res = await req.json()
            setSightings(res)
            console.log(res)

        }
        request()
    }, [])
    return (
        <div>
            {
                sightings.map((sighting) => {
                    return (
                        <div className="sightingCard">
                            <img src={sighting.image} className="sightingImg" />
                            <p>{sighting.description}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}