import React from 'react'

const BlogPage = ({blog, like, user, remove}) => {

    if(blog == null){
        return null
    }
    const creator = (blog.user.username === user.username)

    return (
        <div className='details'>
        <h1>{blog.title}</h1>
        <a href={blog.url}>{blog.url}</a>
        <div>{blog.likes} likes
          <button onClick={() => like(blog)}>like</button>
        </div>
        <div>added by {blog.user.name}</div>
        {creator &&(<button onClick={() => remove(blog)}>remove </button>)}
      </div>
    )


}

export default BlogPage