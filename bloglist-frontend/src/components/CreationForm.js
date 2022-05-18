const CreationForm = ({
    handleNewBlog, newBlog, setNewBlog, newAuthor, setNewAuthor, newUrl, setNewUrl
}) => {
    
    return (
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
}

export default CreationForm