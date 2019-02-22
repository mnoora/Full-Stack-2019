import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({
  addBlog,
  newAuthor,
  newTitle,
  newUrl,
  handleAuthorChange,
  handleTitleChange,
  handleUrlChange
}) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title: <input
            value={newTitle}
            onChange={handleTitleChange}
          />
        </div>
        <div>
            author: <input
            value= {newAuthor}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
            url: <input
            value= {newUrl}
            onChange={handleUrlChange}
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
  newAuthor: PropTypes.string.isRequired,
  newTitle: PropTypes.string.isRequired,
  newUrl:PropTypes.string.isRequired,
  handleAuthorChange: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  handleUrlChange: PropTypes.func.isRequired
}

export default BlogForm