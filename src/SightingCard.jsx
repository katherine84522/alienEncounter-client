import { useState, useEffect } from 'react'



export default function SightingCard({ sighting }) {

    const [likes, setLikes] = useState(0)


    useEffect(() => {
        const request = async () => {
            let req = await fetch(`http://localhost:3000/reports/${sighting.id}`)
            let res = await req.json()
            setLikes(res.likecount)
        }
        request()
    }, [])

    const handleLike = () => {

        const request = async () => {
            let req = await fetch(`http://localhost:3000/reports/${sighting.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    likecount: likes + 1,
                }),
            });
            let res = await req.json()
            console.log(res)

            setLikes(likes + 1)
        }

        request()

    }

    return (
        <div className="sightingCard">
            <img src={sighting.image} className="sightingImg" />
            <p className = "country">Saw in {sighting.country}</p>
            <p className ="description">{sighting.description}</p>
            <p className="likes">{likes} likes </p>
            <button onClick={() => { handleLike() }} className="likeButton">🛸 Like</button>
        </div>
    )

}
