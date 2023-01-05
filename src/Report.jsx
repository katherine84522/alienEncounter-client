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
                    year: e.target.year.value,
                    month: e.target.month.value,
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
                <div>
                    <label className="dateFont">Date:</label>
                    <input placeholder="Month" type="text" name="month" className="dateText" />
                    <input placeholder="Date" type="text" name="date" className="dateText" />
                    <input placeholder="Year" type="text" name="year" className="dateText" />
                </div>
                <br />
                <label className="descriptionFont">Please describe the alien or its aircraft:</label>
                <textarea className="descriptionText" name="description" />
                <br />

                <input className="button-23" type="submit" />




            </form>

        </div>
    )
}