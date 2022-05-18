import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import CreationForm from './components/CreationForm'
import LoginForm from './components/LoginForm'
import LogoutButton from './components/LogoutButton'
import Togglable from './components/Togglable'
import blogService from './services/blogs'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [messageText, setMessageText] = useState(null)
  const [messageColor, setMessageColor] = useState("green")

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      <h2>Favorite Blogs App</h2>
      <Notification
        messageText={messageText}
        messageColor={messageColor}
      />
      {user === null ?
        <LoginForm
          user={user}
          setUser={setUser}
          setMessageColor={setMessageColor}
          setMessageText={setMessageText}
        /> :
        <div>
          <p>{user.name} is logged in.</p>
          <LogoutButton setUser={setUser}/>
          <Togglable buttonLabel="Add a New Blog">
            <h2>Add New Blog</h2>
            <CreationForm
              setBlogs={setBlogs}
              blogs={blogs}
              setMessageColor={setMessageColor}
              setMessageText={setMessageText}
              setUser={setUser}
              user={user}
            />
          </Togglable>
          <h2>Blogs</h2>
          {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }      
    </div>
  )
}

export default App
