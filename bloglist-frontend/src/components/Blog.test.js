import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Blog from './Blog';

test('renders title and author but not other fields', () => {
  const blog = {
    'title': 'title to be tested',
    'author': 'Test Terminator',
    'url': 'a web address',
    'likes': 34,
    'user': {
      'username': 'root',
      'name': 'The Dev',
      'id': '627cc3a7bfad3940405b9fcc'
    },
    'id': '627cc8de15f64203131a5973'
  };

  render(<Blog blog={blog} />);

  const titleEle = screen.getByText('title to be tested', { exact : false });
  expect(titleEle).toBeDefined();

  const authorEle = screen.getByText('Test Terminator', { exact : false });
  expect(authorEle).toBeDefined();

  const likesEle = screen.queryByText('a web address');
  expect(likesEle).toBeNull();
});