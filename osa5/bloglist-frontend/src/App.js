import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import NotificationError from './components/NotificationError';
import NotificationSuccess from './components/NotificationSuccess';

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [ successMessage, setSuccessMessage] = useState(null)
  const [user, setUser] = useState(null)

  const [ newTitle, setNewTitle ] = useState('')
  const [ newUrl, setNewUrl] = useState('')
  const [ newAuthor, setNewAuthor] = useState('')

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

  const addBlog = async (event) => {
    event.preventDefault()
    try {
      const blog = await blogService.create({
        title: newTitle,
        author: newAuthor,
        url: newUrl
      })
      setSuccessMessage(`a new blog ${newTitle} by ${newAuthor} added` )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)

      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
    } catch (exception) {
      setErrorMessage('blogia ei voitu luoda')
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

  const BlogForm = () => {
    return (
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

    )
}
const handleTitleChange = (event) => {
  console.log(event.target.value)
  setNewTitle(event.target.value)
}

const handleAuthorChange = (event) => {
  console.log(event.target.value)
  setNewAuthor(event.target.value)
}
const handleUrlChange = (event) => {
  console.log(event.target.value)
  setNewUrl(event.target.value)
}

  return (
    <div>
      <h2>blogs</h2>
      <NotificationSuccess message={successMessage} />
      <NotificationError message={errorMessage} />
      <h2>Kirjaudu</h2>

      {user === null ?
      loginForm() :
      <div>
        <p>{user.name} logged in</p>

        <button onClick={handleLogout}>logout</button>
      <br/>
      <h2>create new</h2>
      {BlogForm()}
      <br/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      </div>
    }
    </div>
  )
}

export default App