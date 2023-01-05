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
                <img src={article.image} className="articleImg" />
                <div>
                <h3 className="titleText">{article.title}</h3>
                <p className="newsText">Written By {article.author}</p>
                <p className="newsText">Published on {article.month}/{article.date}/{article.year}</p>
                <p className="readMore" onClick={() => { handleArticle(article) }}>👽 Read more</p>
                </div>


            </div>
    )
}

