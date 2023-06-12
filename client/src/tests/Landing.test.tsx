import React from 'react';
import { render, screen } from '@testing-library/react';
import Landing from '../routes/Landing';
import { text } from 'stream/consumers';

test('renders distancealyzer title', () => {
  render(
    <Landing />
  )

  const textElement = screen.getByText(/distancealyzer/i);
  expect(textElement).toBeInTheDocument();
});

test('tells user to open menu', () => {
  render (
    <Landing />
  );

  const textElem = screen.getByText(/open the menu/i);
  expect(textElem).toBeInTheDocument();
})