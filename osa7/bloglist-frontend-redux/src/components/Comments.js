import React from 'react'

const Comments = ({blog}) => {

    if(blog.comments.length === 0){
        return(
            <div>
                No comments added!
            </div>
        )
    }

    return ( 
        <div>
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