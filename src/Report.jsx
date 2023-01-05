import { useNavigate } from "react-router-dom"
import { useState } from 'react'

export default function Report() {
    const navigate = useNavigate()

    // const [img, setImg] = useState('')
    // const [country, setCountry] = useState('')
    // const [date, setDate] = useState('')
    // const [description, setDescription] = useState('')


    const handleSubmit = (e) => {
        const request = async () => {
            let req = await fetch("http://localhost:3000/reports", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    country: e.target.country.value,
                    image: e.target.image.value,
                    date: e.target.date.value,
                    description: e.target.description.value
                }),
            });
            let res = await req.json()
            console.log(res)

        }
        request()
        navigate("/")
    }


    return (
        <div className="postImg" >
            <form onSubmit={handleSubmit}>
                <label className="dateFont">Image URL:</label>
                <input className="dateText" type="text" name="image" />
                <br />
                <label className="dateFont">Country:</label>
                <input className="dateText" type="text" name="country" />
                <br />
                <label className="dateFont">Date:</label>
                <input type="text" name="date" className="dateText"/>
                <br />
                <label className="descriptionFont">Please describe the alien or its aircraft:</label>
                <textarea className="descriptionText" name="description" />
                <br />
                
                <input className ="button-23" type="submit"/>
                
                


            </form>

        </div>
    )
}