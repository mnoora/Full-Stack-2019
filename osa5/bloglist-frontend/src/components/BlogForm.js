import React from 'react' 

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
          value= {newTitle}
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

      export default BlogForm