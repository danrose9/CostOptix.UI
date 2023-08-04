import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CostContainerBuilder from '../builder/CostContainerBuilder';

describe('CostContainerBuilder', () => {
  let result: any;
  beforeEach(() => {
    result = render(<CostContainerBuilder />);
  });

  test('renders CostContainerBuilder component', () => {
    expect(screen.getByText(/Reset/i)).toBeInTheDocument();
    expect(screen.getByText(/Container Name/i)).toBeInTheDocument();
  });
});
