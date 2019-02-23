import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({
  addBlog,
  newAuthor,
  newTitle,
  newUrl
}) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title: <input
            {...newTitle.props}
          />
        </div>
        <div>
            author: <input
            {...newAuthor.props}
          />
        </div>
        <div>
            url: <input
            {...newUrl.props}
          />
        </div>
        <div>
          <button type="submit">create</button>
        </div>
      </form>
    </div>
  )}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
  newAuthor: PropTypes.object.isRequired,
  newTitle: PropTypes.object.isRequired,
  newUrl:PropTypes.object.isRequired,
}

export default BlogForm