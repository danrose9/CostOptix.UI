import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import InformationButton from '../buttons/InformationButton';

describe('InformationButton', () => {
  test('renders InformationButton component', () => {
    render(<InformationButton />);
    const infoIcon = screen.getByTestId('info-icon');
    expect(infoIcon).toBeInTheDocument();
  });
});
