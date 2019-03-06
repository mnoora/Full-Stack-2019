import React from 'react'
import { useField } from '../hooks'

const Comments = ({blog,commentBlog}) => {
    const [comment, commentReset] = useField('text')

    const handleSubmit = (event) => {
        event.preventDefault()
        commentBlog({
            id: blog.id,
            comment: comment.value,
        
        })
        commentReset()
      }

    if(blog.comments.length === 0){
        return(
            <div>
            <form onSubmit={handleSubmit}>
            <div>
             <input {...comment} />
             </div>
            <button type='submit'>add comment</button>
            </form>
                No comments added!
            </div>
        )
    }

    return ( 
        <div>
            <form onSubmit={handleSubmit}>
            <div>
             <input {...comment} />
             </div>
            <button type='submit'>add comment</button>
            </form>
            <ul>
            {blog.comments.map(comment =>
                <li key={comment}>
                {comment}
                </li>)}
        </ul>
        </div>
    )
}

export default Comments