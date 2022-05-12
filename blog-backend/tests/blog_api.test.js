// eslint-disable-next-line no-unused-vars
const { initial } = require('lodash');
const mongoose = require('mongoose');
const helper = require('./test_helpers');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});
  
  const blogObjects = helper.initialBlogs
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
  
  expect(response.body).toHaveLength(helper.initialBlogs.length);
}, 100000);
  
test('blogs contain an expected title', async () => {
  const response = await api.get('/api/blogs');
  const titles = response.body.map(r => r.title);
  expect(titles).toContain(
    'another one'
  );
}, 100000);

test('blogs contain an expected author', async () => {
  const response = await api.get('/api/blogs');
  const authors = response.body.map(r => r.author);
  expect(authors).toContain(
    'some dude'
  );
}, 100000);

test('blogs have id key', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body[0].id).toBeDefined();
}, 100000);

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'learning to use async/await',
    author: 'myself',
    url: 'a link',
    likes: 5
  };
  
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
    
  const titles = blogsAtEnd.map(r => r.title);
  
  expect(titles).toContain(
    'learning to use async/await'
  );
}, 100000);

test('authorless / no url blogs are not added', async () => {
  const authorlessBlog = {
    title: 'learning to use async/await',
    url: 'a link',
    likes: 5
  };
  const noUrlBlog = {
    title: 'learning to use async/await',
    author: 'somebody',
    likes: 0
  };
  
  await api
    .post('/api/blogs')
    .send(authorlessBlog)
    .expect(400);

  await api
    .post('/api/blogs')
    .send(noUrlBlog)
    .expect(400);
  
  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);  
}, 100000);

test('likes defaults to 0', async () => {
  const newBlog = {
    title: 'checking POST without likes',
    author: 'me',
    url: 'a link'
  };
    
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201);
    
  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
  expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toEqual(0);
}, 100000);


afterAll(() => {
  mongoose.connection.close();
});