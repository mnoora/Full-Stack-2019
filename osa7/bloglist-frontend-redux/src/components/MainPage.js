import React from 'react'
import Togglable from './Togglable'
import NewBlog from './NewBlog'
import Blog from './Blog'

const MainPage = ({newBlogRef, createBlog, blogs, byLikes, likeBlog, removeBlog, user }) => {


    return (
        <div>
            <Togglable buttonLabel='create new' ref={newBlogRef}>
        <NewBlog createBlog={createBlog} />
      </Togglable>

      {blogs.sort(byLikes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          like={likeBlog}
          remove={removeBlog}
          user={user}
          creator={blog.user.username === user.username}
        />
      )}
        </div>
    )
}

export default MainPage