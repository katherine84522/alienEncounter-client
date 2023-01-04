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
        <div>
            <form onSubmit={handleSubmit}>
                <label>Image URL:</label>
                <input type="text" name="image" />
                <br />
                <label>Country:</label>
                <input type="text" name="country" />
                <br />
                <label>Date:</label>
                <input type="text" name="date" />
                <br />
                <label>Please describe the alien or its aircraft:</label>
                <textarea name="description" />
                <br />

                <input type="submit" />


            </form>

        </div>
    )
}