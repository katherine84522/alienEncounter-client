import { useState, useEffect } from 'react'



export default function SightingCard({ sighting }) {

    const [likeCount, setLikeCount] = useState(sighting.likecount)


    const handleLike = () => {

        const request = async () => {
            let req = await fetch(`http://localhost:3000/reports/${sighting.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    likecount: likeCount + 1,
                }),
            });
            let res = await req.json()
            setLikeCount(likeCount + 1)
            console.log(res.likecount)

        }
        request()

    }

    // useEffect(() => { }, [sighting.likecount])

    return (
        <div className="sightingCard">
            <div className="imgDiv">
                <img src={sighting.image} className="sightingImg" />
            </div>
            <div className="center">
                <div className="homeText">
                    <p >Saw in {sighting.country} on {sighting.month}/{sighting.date}/{sighting.year}</p>
                    <p >{sighting.description}</p>
                    <div className="likesButton">
                        <p>{likeCount > 1 ? `${likeCount} Likes` : 'Like'} </p>
                        <button onClick={() => { handleLike() }} className="likeButton">🛸 Like</button>
                    </div>
                </div>

            </div>


        </div>
    )

}
