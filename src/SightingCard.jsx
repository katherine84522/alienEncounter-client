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
            <div className="imgDiv">
            <img src={sighting.image} className="sightingImg" />
            </div>
            <div className="center">
                <div className="homeText">
                    <p >Saw in {sighting.country} on {sighting.month}/{sighting.date}/{sighting.year}</p>
                    <p >{sighting.description}</p>
                </div>
                <div className="likesButton">
                    <p>{likes} likes </p>
                    <button onClick={() => { handleLike() }} className="likeButton">🛸 Like</button>
                </div>

            </div>
            
            
        </div>
    )

}
