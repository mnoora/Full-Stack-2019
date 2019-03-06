import React from 'react'
import { useField } from '../hooks'
import { Button } from 'react-bootstrap';

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
            <Button variant="success" type='submit'>add comment</Button>
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
             <Button variant="success" type='submit'>add comment</Button>
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