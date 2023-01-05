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
        <div>
            <div>
                <h2>{article.title}</h2>
                <img src={article.image} style={{ width: "50%" }} />
                <p>Written By {article.author}</p>
                <p>{article.content}</p>
            </div>
            {
                comments.map((comment) => {
                    return (
                        <div>
                            <p>{comment.content}</p>
                        </div>
                    )
                })
            }
            <form onSubmit={e => handleSubmit(e, article)}>
                <input name="content" type="text" value={content} onChange={(e) => { setContent(e.target.value) }} />
                <input type="submit" />
            </form>
        </div>
    )
}