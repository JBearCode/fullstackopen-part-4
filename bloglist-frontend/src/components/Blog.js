import { useState } from 'react'

const Blog = ({blog}) => {
  const [expanded, setExpanded] = useState(false)

  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleExpansion = () => {
    expanded ? setExpanded(false) : setExpanded(true)
  }

  if (!expanded) {
    return (
      <div style={blogStyle}>
        <p>{blog.title} by {blog.author}
        <button onClick={toggleExpansion}>Expand</button>
        </p>
      </div>  
    ) 
  } else {
    return (
      <div style={blogStyle}>
        <p>{blog.title}<button onClick={toggleExpansion}>Hide</button></p>
        <p>Author: {blog.author}</p>
        <p>URL: {blog.url}</p>
        <p>Likes: {blog.likes}<button>Like</button></p>
        <p>Submitted by {blog.user.name}</p>
      </div>  
    ) 
  }
}

export default Blog