import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

describe('<Blogs />', () => {
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

  const userObject = {
    'username': 'root'
  };

  test('renders title and author but not other fields', () => {
    render(<Blog blog={blog} />);

    const titleEle = screen.getByText('title to be tested', { exact : false });
    expect(titleEle).toBeDefined();

    const authorEle = screen.getByText('Test Terminator', { exact : false });
    expect(authorEle).toBeDefined();

    const likesEle = screen.queryByText('a web address');
    expect(likesEle).toBeNull();
  });

  test('clicking like button three times calls function three times', async () => {
    const mockHandler = jest.fn();

    render(
      <Blog blog={blog} user={userObject} updateLikes={mockHandler} />
    );

    const user = userEvent.setup();
    const expandButton = screen.getByText('Expand');
    await user.click(expandButton);

    const likeButton = screen.getByText('Like');
    await user.click(likeButton);
    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockHandler.mock.calls).toHaveLength(3);
  });
});