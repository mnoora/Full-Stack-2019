import React from 'react'
import Togglable from './Togglable'
import NewBlog from './NewBlog'
import Blog from './Blog'
import { Button, Popover, OverlayTrigger } from 'react-bootstrap'
import PropTypes from 'prop-types'


const popover = (
  <Popover id="popover-basic" title="Tip!">
      For more information on the blogs above, click their names. <em>Go ahead! </em> 
  </Popover>
);
  
const Info = () => (
  <OverlayTrigger trigger="click" placement="right" overlay={popover}>
    <Button variant="success">Help!</Button>
  </OverlayTrigger>
);

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
      <br/>
      <Info/>
    </div>
  )
}

MainPage.propTypes = {
  createBlog: PropTypes.func.isRequired,
  newBlogRef: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
  byLikes: PropTypes.func.isRequired,
  likeBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}


export default MainPage