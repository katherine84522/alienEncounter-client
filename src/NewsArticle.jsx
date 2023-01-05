import { useState, useEffect } from 'react'

export default function NewsArticle({ article }) {

    const [comments, setComments] = useState([])
    const [content, setContent] = useState([])

    useEffect(() => {
        console.log(article.id)
        const request = async () => {
            let req = await fetch(`http://localhost:3000/articles/${article.id}/comments`)
            let res = await req.json()
            console.log(res)
            setComments(res)
        }

        request()
    }, [])


    const handleSubmit = (e, article) => {
        e.preventDefault();
        const request = async () => {
            let req = await fetch(`http://localhost:3000/articles/${article.id}/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content: content,
                    article_id: article.id
                }),
            });
            let res = await req.json()
            console.log(res)

            setComments(prevState => [...prevState, res])
        }
        request()
        setContent('')
    }

    return (
        <div className="newsPage">
            <div>
                <h2 className="newsTitle">{article.title}</h2>
                <img src={article.image} className="newsImg" />
                <div className="newsBox">
                <p className="articleAuthor">Written By: {article.author}</p>
                <p className="articleAuthor">Published on {article.month}/{article.date}/{article.year}</p>
                <p className="articleAuthor">{article.content}</p>

                </div>
            </div>
            <form onSubmit={e => handleSubmit(e, article)}>
                <input className="newsBar" name="content" type="text" value={content} onChange={(e) => { setContent(e.target.value) }} />
                <input  className="newsSubmit" type="submit" />
            </form>
            {
                comments.map((comment) => {
                    return (
                        <div className="time">
                            <p className="commentsTime">{comment.created_at}</p>  
                            <p className="comments">{comment.content}</p>
                        </div>
                    )
                })
            }
            
        </div>
    )
}