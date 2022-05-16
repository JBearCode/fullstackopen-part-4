import { useState, useEffect } from 'react'
import Blog from './components/Blog'
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

  const logUserOut = () => {
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

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const creationForm = () => (
    <form onSubmit={handleNewBlog}>
      <div>
        blog name
          <input
          type="text"
          value={newBlog}
          name="Blogname"
          onChange={({ target }) => setNewBlog(target.value)}
        />
      </div>
      <div>
        author
          <input
          type="text"
          value={newAuthor}
          name="Authorname"
          onChange={({ target }) => setNewAuthor(target.value)}
        />
      </div>
      <div>
        url
          <input
          type="text"
          value={newUrl}
          name="URL"
          onChange={({ target }) => setNewUrl(target.value)}
        />
      </div>
      <button type="submit">Submit New Blog</button>
    </form>      
  )

  return (
    <div>
      <h2>favorite blogs app</h2>
      <Notification
        messageText={messageText}
        messageColor={messageColor}
      />
      {user === null ?
      loginForm() :
      <div>
        <p>{user.name} is logged in.</p>
        <button onClick={logUserOut}>Log Out</button>
        <h2>Submit New Blog</h2>
        <div>{creationForm()}</div>
        <h2>Blogs</h2>
        {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      </div>
    }      

    </div>
  )
}

const Notification = ({ messageText, messageColor }) => {
  const styleObject = {
    color: messageColor,
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  if (messageText === null) {
    return null;
  }

  return (
    <div className='notification' style={styleObject}>
      {messageText}
    </div>
  );
};

export default App
