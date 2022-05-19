import Blog from './Blog';
import PropTypes from 'prop-types';
import blogService from '../services/blogs';

const ListedBlogs = ({ blogs, setBlogs, sortBy, user }) => {
  // update number of likes for one blog, then update app state
  const updateLikes = async (id, likes) => {
    const likesObject = {
      likes: likes + 1
    };
    await blogService.update(id, likesObject);
    const allUpdated = await blogService.getAll();
    const oneUpdated = allUpdated.filter(b => b.id === id)[0];
    setBlogs(blogs.map(b => b.id !== id ? b : oneUpdated));
  };

  if (sortBy === 'default') {
    console.log('sorting by date added');
    return (
      <div>
        {blogs
          .map(blog =>
            <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} user={user} updateLikes={updateLikes}/>
          )}
      </div>
    );
  } else if (sortBy === 'likes') {
    console.log('sorting by likes');
    const sorted = [...blogs].sort((a, b) => b.likes - a.likes);

    return (
      <div>
        {sorted
          .map(blog =>
            <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} user={user} updateLikes={updateLikes}/>
          )}
      </div>
    );
  } else {
    console.log('error with sortBy state preventing blogs from being displayed by ListedBlogs component');
    return null;
  }
};

ListedBlogs.propTypes = {
  sortBy: PropTypes.string.isRequired,
};

export default ListedBlogs;