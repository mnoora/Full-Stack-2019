import React from 'react'
import PropTypes from 'prop-types'

const UserPage = ({user}) => {
  if ( user === undefined) { 
    return null
  }

  if(user.blogs.length === 0){
    return (
      <div>
        <h1>{user.name}</h1>
        <strong>no added blogs</strong>
      </div>
    )
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <strong>added blogs</strong>
      <ul>
        {user.blogs.map(blog =>
          <li key={blog.id}>
            {blog.title}
          </li>)}
      </ul>

    </div>
  )
}

UserPage.propTypes = {
  user: PropTypes.object
}

export default UserPage