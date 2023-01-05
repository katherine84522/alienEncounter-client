import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


export default function Article({ article, setArticle }) {




    let navigate = useNavigate()

    const handleArticle = (article) => {
        setArticle(article)
        let path = `/news/${article.id}`
        navigate(path);
    }


    return (
            <div className="articleCard">
                <h2>{article.title}</h2>
                <img src={article.image} className="articleImg" />
                <p>Written By {article.author}</p>
                <p>{article.published}</p>
                <p>{article.content}</p>
                <p onClick={() => { handleArticle(article) }}>Read more</p>

            </div>
    )
}

