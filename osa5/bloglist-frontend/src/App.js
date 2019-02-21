import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import Togglable from './components/Togglable'
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
  const [loginVisible, setLoginVisible] = useState(false)
  const blogFormRef = React.createRef()

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
    blogFormRef.current.toggleVisibility()
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

  const like = async (blog) => {
    try {
      blog.likes = blog.likes+1 
      const b =await blogService.update(blog.id, blog)
    }catch (exception) {
      setErrorMessage('tykkäystä ei voitu lisätä')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const loginForm = () => {
    return (
      <div>
        <Togglable buttonLabel='login'>
  <LoginForm
    username={username}
    password={password}
    handleUsernameChange={({ target }) => setUsername(target.value)}
    handlePasswordChange={({ target }) => setPassword(target.value)}
    handleSubmit={handleLogin}
  />
</Togglable>
      </div>
    )
  }

  const blogForm = () => {
    return (
      <Togglable buttonLabel="create" ref={blogFormRef} >
      <BlogForm addBlog={addBlog}
                newAuthor={newAuthor}
                newTitle={newTitle}
                newUrl={newUrl}
                handleAuthorChange={handleAuthorChange}
                handleTitleChange= {handleTitleChange}
                handleUrlChange={handleUrlChange}
  />
</Togglable>
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
      {blogForm()}
      <br/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} like={like} />
      )}
      </div>
    }
    </div>
  )
}

export default App