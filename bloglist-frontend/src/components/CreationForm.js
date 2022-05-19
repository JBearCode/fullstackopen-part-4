import { useState } from 'react';
import blogService from '../services/blogs';


const CreationForm = ({
  setBlogs, blogs, setMessageColor, setMessageText, setUser, user, creationFormRef
}) => {

  const [newBlog, setNewBlog] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newUrl, setNewUrl] = useState('');

  const handleNewBlog = async (event) => {
    event.preventDefault();
    const newBlogToSubmit = {
      title: newBlog,
      author: newAuthor,
      url: newUrl
    };
    try {
      // change 'visible' state in Togglable component through useRef
      creationFormRef.current.toggleVisibility();
      await blogService.create(newBlogToSubmit);
      const response = await blogService.getAll();
      const newBlog = response[response.length - 1];
      setBlogs(blogs.concat(newBlog));
      setMessageColor('green');
      setMessageText(`New Blog Added: ${newBlog.title} by ${newBlog.author}`);
      setUser(user);
      setNewBlog('');
      setNewAuthor('');
      setNewUrl('');
    } catch (exception) {
      setMessageColor('red');
      setMessageText('Failed to add blog');
    }
    setTimeout(() => {
      setMessageText(null);
    }, 5000);
  };

  return (
    <form onSubmit={handleNewBlog}>
      <div>
        Blog Name
        <input
          type="text"
          value={newBlog}
          name="Blogname"
          onChange={({ target }) => setNewBlog(target.value)}
        />
      </div>
      <div>
        Author
        <input
          type="text"
          value={newAuthor}
          name="Authorname"
          onChange={({ target }) => setNewAuthor(target.value)}
        />
      </div>
      <div>
        URL
        <input
          type="text"
          value={newUrl}
          name="URL"
          onChange={({ target }) => setNewUrl(target.value)}
        />
      </div>
      <button type="submit">Submit New Blog</button>
    </form>
  );
};

export default CreationForm;