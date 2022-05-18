const CreationForm = ({
    handleNewBlog, newBlog, setNewBlog, newAuthor, setNewAuthor, newUrl, setNewUrl
}) => {
    
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
    )   
}

export default CreationForm