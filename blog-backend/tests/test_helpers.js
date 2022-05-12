const Blog = require('../models/blog');

const initialBlogs = [
  {
    'title': 'here\'s the title',
    'author': 'some dude',
    'url': 'a web address',
    'likes': 12,
    'id': '6272058048fe793e684b75c3'
  },
  {
    'title': 'another one',
    'author': 'some dude',
    'url': 'a web address',
    'likes': 12,
    'id': '6272059048fe793e684b75c5'
  },
  {
    'title': 'third time\'s the charm',
    'author': 'some dude',
    'url': 'a web address',
    'likes': 12,
    'id': '6272059c48fe793e684b75c7'
  },
  {
    'title': 'testing after change',
    'author': 'some dude',
    'url': 'a web address',
    'likes': 12,
    'id': '6272068c478cc86a64efc803'
  },
  {
    'title': 'Henry the 5th',
    'author': 'some dude',
    'url': 'a web address',
    'likes': 12,
    'id': '627207f2478cc86a64efc806'
  }
];

const nonExistingId = async () => {
  const blog = new Blog({ 
    'title': 'To be forgotten',
    'author': 'nobody',
    'url': 'nowhere',
    'likes': 0,
  });

  await blog.save();
  await blog.remove();

  return blog.id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
};

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
};