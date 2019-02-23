import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import Togglable from './components/Togglable'
import loginService from './services/login'
import NotificationError from './components/NotificationError'
import NotificationSuccess from './components/NotificationSuccess'
import  { useField } from './hooks'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const username = useField('text')
  const password = useField('password')

  const [errorMessage, setErrorMessage] = useState(null)
  const [ successMessage, setSuccessMessage] = useState(null)
  const [user, setUser] = useState(null)
  const blogFormRef = React.createRef()

  const title = useField('text')
  const url = useField('text')
  const author = useField('text')

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
        username: username.props.value,
        password: password.props.value
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setErrorMessage('käyttäjätunnus tai salasana virheellinen')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    username.reset()
    password.reset()
  }

  const addBlog = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    try {
      await blogService.create({
        title: title.props.value,
        author: author.props.value,
        url: url.props.value
      })
      setSuccessMessage(`a new blog ${title.props.value} by ${author.props.value} added` )
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)

    } catch (exception) {
      setErrorMessage('blogia ei voitu luoda')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    title.reset()
    author.reset()
    url.reset()
  }

  const like = async (blog) => {
    try {
      blog.likes = blog.likes+1
      await blogService.update(blog.id, blog)
    }catch (exception) {
      setErrorMessage('tykkäystä ei voitu lisätä')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const deleteBlog =async (blog) => {
    if( window.confirm(`remove blog ${blog.title} by ${blog.author}`)){
      try {
        await blogService
          .deleteBlog(blog.id)
        setBlogs(blogs.filter(pe => pe.id !== blogs.id ))
      } catch (exception) {
        setErrorMessage('Blogia ei voitu poistaa')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }
  }

  const handleLogout = async () => {
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
          newAuthor={author}
          newTitle={title}
          newUrl={url}
        />
      </Togglable>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <NotificationSuccess message={successMessage} />
      <NotificationError message={errorMessage} />

      {user === null ?
        <h2>Kirjaudu</h2> &&
        loginForm() :
        <div>
          <p>{user.name} logged in</p>

          <button onClick={handleLogout}>logout</button>
          <br/>
          {blogForm()}
          <br/>
          {blogs.sort((a,b) => b.likes-a.likes).map(blog =>
            <Blog key={blog.id} blog={blog} like={like} deleteBlog={deleteBlog} user={user} />
          )}
        </div>
      }
    </div>
  )
}

export default App