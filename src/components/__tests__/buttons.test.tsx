import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import StandardButton from '../buttons/StandardButton';

afterEach(() => {
  cleanup();
});

describe('Buttons', () => {
  test('standard button should work correctly', () => {
    render(<StandardButton disabled={true} label="Standard Button" positive={true} />);

    const standardButton = screen.getByRole('button', { name: /standard button/i });

    expect(standardButton).toBeDisabled();
    expect(standardButton).toBeInTheDocument();
    expect(standardButton).toHaveClass('positive');
  });
});
