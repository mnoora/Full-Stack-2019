import React, { useState } from 'react'

const Blog = ({ blog }) => {
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
      <div style={blogStyle}>
        <div onClick={() => setShowAll(false)}>
          {blog.title} {blog.author} <br/>
          {blog.url} <br/>
          {blog.likes} likes <button>like</button> <br/>
          added by {blog.user.name}
        </div>
      </div>
    )
  }else{
    return (
      <div style={blogStyle}>
        <div onClick={() => setShowAll(true)}>
          {blog.title} {blog.author}
        </div>
    </div>
)}}

export default Blog