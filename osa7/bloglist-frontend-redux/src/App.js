import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useField } from './hooks'
import {notify } from './reducers/notificationReducer'
import UsersPage from './components/UsersPage'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'
import MainPage from './components/MainPage'
import userService from './services/users'

const App = (props) => {
  const store = props.store
  const [username] = useField('text')
  const [password] = useField('password')
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])


  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs)
    })
  }, [])

  useEffect(() => {
    userService.getAll().then(users => {
      setUsers(users)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
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
        username: username.value,
        password: password.value
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      store.dispatch(notify('wrong username of password',5))
    }
  }

  const handleLogout = () => {
    setUser(null)
    blogService.destroyToken()
    window.localStorage.removeItem('loggedBlogAppUser')
  }

  const createBlog = async (blog) => {
    const createdBlog = await blogService.create(blog)
    newBlogRef.current.toggleVisibility()
    store.dispatch(notify(`a new blog ${createdBlog.title} by ${createdBlog.author} added`,5))
  }

  const likeBlog = async (blog) => {
    const likedBlog = { ...blog, likes: blog.likes + 1}
    const updatedBlog = await blogService.update(likedBlog)
    setBlogs(blogs.map(b => b.id === blog.id ? updatedBlog : b))
    store.dispatch(notify(`blog ${updatedBlog.title} by ${updatedBlog.author} liked!`,5))
  }

  const removeBlog = async (blog) => {
    const ok = window.confirm(`remove blog ${blog.title} by ${blog.author}`)
    if (ok) {
      const updatedBlog = await blogService.remove(blog)
      setBlogs(blogs.filter(b => b.id !== blog.id))
      store.dispatch(notify(`blog ${blog.title} by ${blog.author} removed!`,5))
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>

        <Notification store={store} />

        <form onSubmit={handleLogin}>
          <div>
            käyttäjätunnus
            <input {...username}/>
          </div>
          <div>
            salasana
            <input {...password} />
          </div>
          <button type="submit">kirjaudu</button>
        </form>
      </div>
    )
  }

  const newBlogRef = React.createRef()

  const byLikes = (b1, b2) => b2.likes - b1.likes

  const padding = { padding: 5 }

  return (
    <Router>
    <div>
      <div>
      <Link style={padding} to="/users">users</Link>
      <Link style={padding} to="/"></Link>
      </div>
      <div>
      <h2>blogs</h2>

      <Notification store={store} />

      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>
      <Route exact path="/" render={() =>
        <MainPage newBlogRef={newBlogRef} createBlog={createBlog} blogs={blogs} byLikes={byLikes} likeBlog={likeBlog} removeBlog={removeBlog} user={user}></MainPage>
      } />

      <Route exact path="/users" render={() =>
      <UsersPage users={users} ></UsersPage>
      } />
      </div>
    </div>
    </Router>
  )
}

export default App