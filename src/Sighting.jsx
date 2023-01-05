import { useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react'
import SightingCard from './SightingCard'

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

        const connect = async () => {
            const ws = new WebSocket("ws://localhost:3000/cable")

            ws.onopen = () => {
                console.log("Websockets connected!")

                ws.send(JSON.stringify({ "command": "subscribe", "identifier": `{"channel": "LiveFeedChannel"}` }))
                // ws.send(JSON.stringify({"command": "subscribe", "identifier": "{\"channel\": \"NotificationsChannel\"}"}))
            }

            ws.onmessage = (event) => {
                const data = JSON.parse(event.data)
                if (data.type === "ping" || data.type === "welcome" || data.type === "confirm_subscription") return
                console.log('data', data)

                // Retrieve the newly created post object sent by ActionCable (Rails)
                // Update state using setPosts to reflect this change in the browser immediately
                const sighting = data.message.report
                setSightings(prevState => [sighting, ...prevState])
            }



        }



        connect()

        request()
    }, [])




    return (
        <div className="sighting">
            {
                sightings.map((sighting) => {
                    return (
                        < SightingCard sighting={sighting} />
                    )
                })
            }
        </div>
    )
}