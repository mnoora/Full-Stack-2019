import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import NotificationError from './components/NotificationError';

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('käyttäjätunnus tai salasana virheellinen')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        käyttäjätunnus
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        salasana
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">kirjaudu</button>
    </form>      
  )

 // const blogForm = () => (
  //  <form onSubmit={addBlog}>
   //   <input
 //       value={newNote}
  //      onChange={handleNoteChange}
  //    />
  //    <button type="submit">tallenna</button>
  //  </form>  
 // )

  return (
    <div>
      <h2>blogs</h2>

      <NotificationError message={errorMessage} />
      <h2>Kirjaudu</h2>

      {user === null ?
      loginForm() :
      <div>
        <p>{user.name} logged in</p>
        {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      <button onClick={handleLogout}>logout</button>
      </div>
    }
    </div>
  )
}

export default App