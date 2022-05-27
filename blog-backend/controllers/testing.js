const testingRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

testingRouter.post('/reset', async (request, response) => {
  await Blog.deleteOne({ 'title' : 'a new entry created by Cypress'},);
  await Blog.deleteOne({ 'title' : 'Cypress command note'},);
  await User.deleteOne({ 'username' : 'hereandgone' });

  response.status(204).end();
});

module.exports = testingRouter;