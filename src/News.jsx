import { useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react'

export default function News() {
    const navigate = useNavigate();
    const [ articles, setArticles ] = useState([])
    useEffect(()=> {
        const request = async () => {
            let req = await fetch("http://localhost:3000/articles")
            let res = await req.json()
            setArticles(res)
        }
        request()
    }, [])

    return (
        <div className="article">
            {
                articles.map((article) => {
                    return (
                        <div className="articleCard">
                            <h2>{article.title}</h2>
                            <img src={article.image} className="articleImg"/>
                            <p>Written By {article.author}</p>
                            <p>{article.published}</p>
                            <p>{article.content}</p>

                        </div>
                    )
                })
            }
            
        </div>
    )
}