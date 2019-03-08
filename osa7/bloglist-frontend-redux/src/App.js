import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import { useField } from './hooks'
import {notify } from './reducers/notificationReducer'
import UsersPage from './components/UsersPage'
import {
  BrowserRouter as Router,
  Route, Link
} from 'react-router-dom'
import MainPage from './components/MainPage'
import userService from './services/users'
import UserPage from './components/UserPage';
import BlogPage from './components/BlogPage';
import { Button, Navbar, Nav } from 'react-bootstrap'
import PropTypes from 'prop-types'


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
      store.dispatch(notify('wrong username or password',5))
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

  const commentBlog = async (props) => {
    const findBlog = blogById(props.id)
    const comments = findBlog.comments
    const newComments = comments.concat(props.comment)
    const commentedBlog = { ...findBlog, comments: newComments}
    const updatedBlog = await blogService.update(commentedBlog)
    setBlogs(blogs.map(b => b.id === findBlog.id ? updatedBlog : b))
    store.dispatch(notify(`Comment added to blog ${updatedBlog.title}`,5))
  
  }

  const removeBlog = async (blog) => {
    const ok = window.confirm(`remove blog ${blog.title} by ${blog.author}`)
    if (ok) {
      await blogService.remove(blog)
      setBlogs(blogs.filter(b => b.id !== blog.id))
      store.dispatch(notify(`blog ${blog.title} by ${blog.author} removed!`,5))
    }
  }



  if (user === null) {
    return (
      <div className="container">
        <h2>log in to application</h2>

        <Notification store={store} />

        <form onSubmit={handleLogin}>
          <div>
            käyttäjätunnus
            <input id='username' {...username}/>
          </div>
          <div>
            salasana
            <input id='password' {...password} />
          </div>
          <Button variant="success" type="submit">kirjaudu</Button>
        </form>
      </div>
    )
  }

  const newBlogRef = React.createRef()

  const byLikes = (b1, b2) => b2.likes - b1.likes

  const padding = { padding: 5 }

  const userById = (id) => users.find(user => user.id === id)
  const blogById = (id) => blogs.find(blog => blog.id === id)

  return (
    <div className="container">
      <Router>
        <div>
          <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="#" as="span">
                  <Link style={padding} to="/">blogs</Link>
                </Nav.Link>
                <Nav.Link href="#" as="span">
                  <Link style={padding} to="/users">users</Link>
                </Nav.Link>
                <Nav.Link href="#" as="span">
                  {user
                    ? <><em>{user.name} logged in</em> <Button variant="secondary" onClick={handleLogout}>logout</Button> </>
                    : <Link to="/">login</Link>
                  }
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <div>
            <h2>blogs</h2>

            <Notification store={store} />

            <Route exact path="/" render={() =>
              <MainPage newBlogRef={newBlogRef} createBlog={createBlog} blogs={blogs} byLikes={byLikes} likeBlog={likeBlog} removeBlog={removeBlog} user={user}></MainPage>
            } />

            <Route exact path="/users" render={() =>
              <UsersPage users={users} ></UsersPage>
            } />

            <Route exact path="/users/:id" render={({match}) =>
              <UserPage user={userById(match.params.id)} />
            } />

            <Route exact path="/blogs/:id" render={({match}) =>
              <BlogPage blog={blogById(match.params.id)} like={likeBlog} remove={removeBlog} user={user} comment={commentBlog} />  
            } />
          </div>
        </div>
      </Router>
    </div>
  )
}

App.propTypes = {
  store: PropTypes.object.isRequired,
  id: PropTypes.string,
  comment: PropTypes.string
}
export default App