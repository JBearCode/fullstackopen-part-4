const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => { 
  const blogs = await Blog.find({});
  response.json(blogs);
});

/*
blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body);

  try {
    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
  } catch(exception) {
    next(exception);
  }
});
*/

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  });

  try {
    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
  } catch(exception) {
    next(exception);
  }
});

/*
blogsRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then(blog => {
      if (blog) {
        response.json(blog);
      } else {
        response.status(404).end();
      }
    })
    .catch(error => next(error));
});

blogsRouter.delete('/:id', (request, response, next) => {
  Blog.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch(error => next(error));
});

blogsRouter.put('/:id', (request, response, next) => {
  const body = request.body;

  const blog = {
    content: body.content,
    important: body.important,
  };

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      response.json(updatedBlog);
    })
    .catch(error => next(error));
});

*/

module.exports = blogsRouter;