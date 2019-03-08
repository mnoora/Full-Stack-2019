import React from 'react'
import Comments from './Comments'
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types'

const BlogPage = ({blog, like, user, remove,comment}) => {

    if(blog == null){
        return null
    }
    const creator = (blog.user.username === user.username)

    return (
        <div className='details'>
            <h1>{blog.title}</h1>
            <a href={blog.url}>{blog.url}</a>
            <div>{blog.likes} likes
                <Button variant="success" onClick={() => like(blog)}>like</Button>
            </div>
            <div>added by {blog.user.name}</div>
            {creator &&(<Button variant="outline-danger" onClick={() => remove(blog)}>remove </Button>)}
            <h3>comments</h3>
            <Comments blog={blog} commentBlog={comment} />
      
        </div>
    )


}

BlogPage.propTypes = {
    blog: PropTypes.object,
    like: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    comment: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}

export default BlogPage