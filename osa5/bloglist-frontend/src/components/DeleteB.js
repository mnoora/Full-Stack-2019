import React from 'react'

const DeleteB = ({ blog,user,deleteBlog }) => {
  if(blog.user && user.username === blog.user.username){
    return (
      <button onClick={() => deleteBlog(blog)}>remove</button>
    )
  }
  return null
}

export default DeleteB