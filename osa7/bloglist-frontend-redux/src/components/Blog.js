import React from 'react'
import PropTypes from 'prop-types'
import {
  Link
} from 'react-router-dom'

const Blog = ({ blog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    color: '#ff66a3',
    background: '#d9d9d9'
  }

  return (
    <div>
      <br/>
      <div style={blogStyle}>

        <Link to={`/blogs/${blog.id}`}> {blog.title} {blog.author}</Link> 
      </div>
    </div>
  )}


Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  like: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  creator: PropTypes.bool.isRequired
}

export default Blog