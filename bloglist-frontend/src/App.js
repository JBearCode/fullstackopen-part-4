import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import CreationForm from './components/CreationForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [messageText, setMessageText] = useState(null)
  const [messageColor, setMessageColor] = useState("green")
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 


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

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      ) 
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessageColor('red')
      setMessageText('Wrong credentials')
      setTimeout(() => {
        setMessageText(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  const handleNewBlog = async (event) => {
    event.preventDefault()
    const newBlogToSubmit = {
      title: newBlog,
      author: newAuthor,
      url: newUrl
    }
    try {
      const response = await blogService.create(newBlogToSubmit)
      setBlogs(blogs.concat(response))
      setMessageColor('green')
      setMessageText(`New Blog Added: ${response.title} by ${response.author}`)
      setUser(user)
      setNewBlog('')
      setNewAuthor('')
      setNewUrl('')
    } catch (exception) {
      setMessageColor('red')
      setMessageText('Failed to add blog')
    }
    setTimeout(() => {
      setMessageText(null)
    }, 5000)
  }

  return (
    <div>
      <h2>Favorite Blogs App</h2>
      <Notification
        messageText={messageText}
        messageColor={messageColor}
      />
      {user === null ?
      <LoginForm
        handleLogin={handleLogin}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      /> :
      <div>
        <p>{user.name} is logged in.</p>
        <button onClick={handleLogout}>Log Out</button>
        <h2>Submit New Blog</h2>
        <CreationForm
          handleNewBlog={handleNewBlog}
          newBlog={newBlog}
          setNewBlog={setNewBlog}
          newAuthor={newAuthor}
          setNewAuthor={setNewAuthor}
          newUrl={newUrl}
          setNewUrl={setNewUrl}
        />
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
