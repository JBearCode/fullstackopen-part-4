import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreationForm from './CreationForm';


test('<CreationForm /> allows text inputs', async () => {
  const mockFn = jest.fn();
  const user = userEvent.setup();

  render(<CreationForm jestFunction={mockFn} />);

  const inputs = screen.getAllByRole('textbox');

  await user.type(inputs[0], 'title test' );
  await user.type(inputs[1], 'author test' );
  await user.type(inputs[2], 'URL test' );

  screen.debug();
  expect(inputs[0].value).toBe('title test');
  expect(inputs[1].value).toBe('author test');
  expect(inputs[2].value).toBe('URL test');
});