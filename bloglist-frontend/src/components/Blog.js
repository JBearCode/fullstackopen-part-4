import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({blog, blogs, setBlogs, user}) => {
  // state for whether all blog info should be shown
  const [expanded, setExpanded] = useState(false)
  console.log(blog.user.name)

  const toggleExpansion = () => {
    expanded ? setExpanded(false) : setExpanded(true)
  }

  // handle button click to delete blogs
  const handleDelete = (id) => {
    console.log('delete ID', id)
    blogService.deleteBlog(id)
    setBlogs([...blogs].filter(b => b.id !== id))
  }

  // style for each blog in list
  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  // update number of likes for one blog, then update app state
  const updateLikes = async (id, likes) => {
    console.log(id, likes)
    const likesObject = {
      likes: likes + 1
    }
    await blogService.update(id, likesObject)
    const allUpdated = await blogService.getAll()
    const oneUpdated = allUpdated.filter(b => b.id === id)[0]
    setBlogs(blogs.map(b => b.id !== id ? b : oneUpdated))
  }

  // return shorter or longer listing based on 'expanded' state
  if (!expanded) {
    return (
      <div style={blogStyle}>
        <p>{blog.title} by {blog.author}
        <button onClick={toggleExpansion}>Expand</button>
        </p>
      </div>  
    ) 
  } else {
    console.log(user)
    return (
      <div style={blogStyle}>
        <p>{blog.title}<button onClick={toggleExpansion}>Hide</button></p>
        <p>Author: {blog.author}</p>
        <p>URL: {blog.url}</p>
        <p>Likes: {blog.likes}<button onClick={() => updateLikes(blog.id, blog.likes)}>Like</button></p>
        <p>Submitted by {blog.user.name}</p>
        {(blog.user.username === user.username) && 
        <button onClick={() => handleDelete(blog.id)}>Delete This Blog</button>
        }
      </div>  
    ) 
  }
}

export default Blog