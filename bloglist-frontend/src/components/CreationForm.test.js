import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreationForm from './CreationForm';

test('<CreationForm />', async () => {
  const createBlog = jest.fn();
  const user = userEvent.setup();

  render(<CreationForm />);

  screen.debug();

  const input = screen.getByRole('textbox');
  const sendButton = screen.getByText('Submit New Blog');

  await user.type(input, 'testing a form...' );
  await user.click(sendButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].content).toBe('testing a form...' );
});