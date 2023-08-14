import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CostContainerBuilder from '../builder/CostContainerBuilder';
import { ApplicationWrapper } from '../../../tests/helpers';

describe('CostContainerBuilder', () => {
  let result: any;
  beforeEach(() => {
    const mockToggleContainerList = (value: boolean) => {};
    render(<CostContainerBuilder toggleContainerList={mockToggleContainerList} />, { wrapper: ApplicationWrapper });
  });

  test('renders CostContainerBuilder component', () => {
    expect(screen.getByText(/Reset/i)).toBeInTheDocument();
    expect(screen.getByText(/Container Name/i)).toBeInTheDocument();
  });
});
