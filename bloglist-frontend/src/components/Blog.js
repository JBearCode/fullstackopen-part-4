import { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog, blogs, setBlogs, user, updateLikes }) => {
  // state for whether all blog info should be shown
  const [expanded, setExpanded] = useState(false);

  const toggleExpansion = () => {
    expanded ? setExpanded(false) : setExpanded(true);
  };

  // handle button click to delete blogs
  const handleDelete = (id, title) => {
    console.log('delete ID', id);
    if (window.confirm(`Do you want to delete "${title}"?`)) {
      blogService.deleteBlog(id);
      setBlogs([...blogs].filter(b => b.id !== id));
    }
  };

  // style for each blog in list
  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  // return shorter or longer listing based on 'expanded' state
  if (!expanded) {
    return (
      <div style={blogStyle}>
        <p className="contractedBlogPara">{blog.title} by {blog.author}
          <button className='expandButton' onClick={toggleExpansion}>Expand</button>
        </p>
      </div>
    );
  } else {
    return (
      <div style={blogStyle}>
        <p>{blog.title}<button className='hideButton' onClick={toggleExpansion}>Hide</button></p>
        <p>Author: {blog.author}</p>
        <p>URL: {blog.url}</p>
        <p>Likes: <span className='likesIntSpan'>{blog.likes}</span><button onClick={() => updateLikes(blog.id, blog.likes)}>Like</button></p>
        <p>Submitted by {blog.user.name}</p>
        {(blog.user.username === user.username) &&
        <button className='deleteButton' onClick={() => handleDelete(blog.id, blog.title)}>Delete This Blog</button>
        }
      </div>
    );
  }
};

export default Blog;