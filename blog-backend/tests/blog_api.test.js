// eslint-disable-next-line no-unused-vars
const { initial } = require('lodash');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
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

beforeEach(async () => {
  await Blog.deleteMany({});
  
  const blogObjects = initialBlogs
    .map(blog => new Blog(blog));
  const promiseArray = blogObjects.map(blog => blog.save());
  await Promise.all(promiseArray);
}, 100000);

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
}, 100000);

test('there are five blogs', async () => {
  const response = await api.get('/api/blogs');
  
  expect(response.body).toHaveLength(initialBlogs.length);
});
  
test('blogs contain an expected title', async () => {
  const response = await api.get('/api/blogs');
  const titles = response.body.map(r => r.title);
  expect(titles).toContain(
    'another one'
  );
});

test('blogs contain an expected author', async () => {
  const response = await api.get('/api/blogs');
  const authors = response.body.map(r => r.author);
  expect(authors).toContain(
    'some dude'
  );
});

afterAll(() => {
  mongoose.connection.close();
});