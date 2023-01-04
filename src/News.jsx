import { useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react'
import Article from './Article'

export default function News() {
    const navigate = useNavigate();
    const [ articles, setArticles ] = useState([])
 
    useEffect(()=> {
        const request = async () => {
            let req = await fetch("http://localhost:3000/articles")
            let res = await req.json()
            setArticles(res)
        
        }
       
        const connect = async () => {
            const ws = new WebSocket("ws://localhost:3000/cable")

            ws.onopen = () => {
                console.log("Websockets for News connected!")

                ws.send(JSON.stringify({ "command": "subscribe", "identifier": `{"channel": "NewsFeedChannel"}` }))
                // ws.send(JSON.stringify({"command": "subscribe", "identifier": "{\"channel\": \"NotificationsChannel\"}"}))
            }

            ws.onmessage = (event) => {
                const data = JSON.parse(event.data)
                if (data.type === "ping" || data.type === "welcome" || data.type === "confirm_subscription") return
                console.log('data', data)

                // Retrieve the newly created post object sent by ActionCable (Rails)
                // Update state using setPosts to reflect this change in the browser immediately
                const article = data.message.article
                setArticles(prevState => [...prevState, article])
            }



        }


        connect()
        request()
    },[])


    

    return (
        <div className="article">
            {
                articles.map((article) => {
                    return (
                        < Article article={article} />
                    )
                })
            }
            
        </div>
    )
}