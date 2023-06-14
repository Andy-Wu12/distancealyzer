import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import NotFound from '../routes/404';


test('explicitly renders "ERROR 404" text', () => {
  render(<NotFound />);

  const textElement = screen.getByText(/ERROR 404/);
  expect(textElement).toBeInTheDocument();
})

test('should provide a message mentioning url does not exist', () => {
  render(<NotFound />);

  const textElement = screen.getByText(/url.+(does not exist|not found)/i);
  expect(textElement).toBeInTheDocument();
})
