// eslint-disable-next-line no-unused-vars
const { initial } = require('lodash');
const mongoose = require('mongoose');
const helper = require('./test_helpers');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');
const User = require('../models/user');
const bcrypt = require('bcrypt');

let token;

beforeEach(async () => {
  jest.setTimeout(100000);
  await User.deleteMany({});
  await Blog.deleteMany({});
    
  const newUser = {
    username: 'root',
    password: 'password',
  };

  await api.post('/api/users').send(newUser);
  await Blog.insertMany(helper.initialBlogs);

  const result = await api.post('/api/login').send(newUser);

  token = result.body.token;
}, 100000);

describe('testing GET requests to base URL', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('there are five blogs', async () => {
    const response = await api.get('/api/blogs');
    
    expect(response.body).toHaveLength(helper.initialBlogs.length);
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

  test('blogs have id key', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body[0].id).toBeDefined();
  });

});

describe('testing POST requests', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'learning to use async/await',
      author: 'myself',
      url: 'a link',
      likes: 5
    };
        
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);
      
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
          
    const titles = blogsAtEnd.map(r => r.title);
        
    expect(titles).toContain(
      'learning to use async/await'
    );
  });

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
      .set('Authorization', `Bearer ${token}`)
      .send(authorlessBlog)
      .expect(400);
  
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(noUrlBlog)
      .expect(400);
    
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);  
  });

  test('likes defaults to 0', async () => {
    const newBlog = {
      title: 'checking POST without likes',
      author: 'me',
      url: 'a link'
    };
      
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201);
      
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
    expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toEqual(0);
  });
});

describe('testing DELETE requests', () => {
  test('succeeds with creation then deletion', async () => {
    await Blog.deleteMany({});
    // create new blog to delete
    const newBlog = {
      title: 'learning to use async/await',
      author: 'myself',
      url: 'a link',
      likes: 5
    };
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);
    // query the blog just created to get id
    const response = await api.get('/api/blogs');
    const id = response.body[0].id;

    await api
      .delete(`/api/blogs/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);
  
    const blogsAtEnd = await helper.blogsInDb();
  
    expect(blogsAtEnd).toHaveLength(0);
  });
});
  
describe('testing PUT requests', () => {
  test('blog votes can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];
    
    const updatedBlog = {
      likes: 20
    };
          
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);
        
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd[0].likes).toEqual(20);
  });
});

describe('testing users in database', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('sekret', 10);
    const user = new User({ username: 'root', passwordHash });

    await user.save();
  });

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'henry',
      name: 'Henry Ford',
      password: 'ford',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map(u => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'root',
      name: 'The Dev',
      password: 'developer',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('username must be unique');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test('creation fails with proper statuscode and message if username or password is too short', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'A',
      name: 'Arnold',
      password: 'milkisforbabies',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('username and password must each be at least three characters long');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });
});

afterAll(() => {
  mongoose.connection.close();
});