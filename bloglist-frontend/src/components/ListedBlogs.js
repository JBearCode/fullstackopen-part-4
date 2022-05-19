import Blog from './Blog'

const ListedBlogs = ({ blogs, setBlogs, sortBy, user }) => {
    if (sortBy === 'default') {
      console.log('sorting by date added')
      return (
        <div>
          {blogs
            .map(blog =>
            <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} user={user}/>
          )}
        </div>      
      )
    } else if (sortBy === 'likes') {
        console.log('sorting by likes')
        const sorted = [...blogs].sort((a, b) => b.likes - a.likes)

        return (
          <div>
            {sorted
              .map(blog =>
                <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} user={user}/>
            )}
          </div>      
        )
    } else {
        console.log("error with sortBy state preventing blogs from being displayed by ListedBlogs component")
        return null
    }
  }
  
  export default ListedBlogs