import { useState, useEffect } from 'react'


export default function Article ({article}) {


const [comments, setComments] = useState([])

useEffect(()=>{
    const request = async ()=> {
        let req = await fetch(`http://localhost:3000/articles/${article.id}/comments`)
        let res = await req.json()
        setComments(res)
    }
    request()
},[])


    const handleSubmit = (e, article) => {
        e.preventDefault();
        const request = async () => {
            let req = await fetch(`http://localhost:3000/articles/${article.id}/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content: e.target.content.value,
                    article_id: article.id
                }),
            });
            let res = await req.json()
            console.log(res)

            setComments(prevState => [...prevState,res])
        }
        request()
    }


    return (
        <div>
        <div className="articleCard">
            <h2>{article.title}</h2>
            <img src={article.image} className="articleImg" />
            <p>Written By {article.author}</p>
            <p>{article.published}</p>
            <p>{article.content}</p>
            <p></p>

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
        <input name="content" type="text" />
        <input type="submit" />
    </form>
        </div>
    )
}

