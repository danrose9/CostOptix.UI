import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CostContainerBuilder from '../builder/CostContainerBuilder';
import { BrowserRouter as Router } from 'react-router-dom';

describe('CostContainerBuilder', () => {
  let result: any;
  beforeEach(() => {
    result = render(
      <Router>
        <CostContainerBuilder />
      </Router>
    );
  });

  test('renders CostContainerBuilder component', () => {
    expect(screen.getByText(/Reset/i)).toBeInTheDocument();
    expect(screen.getByText(/Container Name/i)).toBeInTheDocument();
  });
});
