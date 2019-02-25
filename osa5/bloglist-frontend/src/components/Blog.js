import React, { useState } from 'react'

import DeleteB from './DeleteB'

const Blog = ({ blog, like, deleteBlog, user }) => {
  const [ showAll, setShowAll] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if(showAll){
    return (
      <div style={blogStyle} className='blog' >
        <div onClick={() => setShowAll(false)} className='showAll'>
          {blog.title} {blog.author} <br/>
          {blog.url} <br/>
          {blog.likes} likes <button onClick={() => like(blog)}>like</button> <br/>
          added by {blog.user? blog.user.name : 'unknown user'} <br/>
          <DeleteB user={user} blog={blog} deleteBlog={deleteBlog}></DeleteB>
        </div>
      </div>
    )
  }else{
    return (
      <div style={blogStyle} className='blog'>
        <div onClick={() => setShowAll(true)} className='default'>
          {blog.title} {blog.author}
        </div>
      </div>
    )}}

export default Blog