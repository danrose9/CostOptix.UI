import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CostContainerBuilder from '../builder/CostContainerBuilder';
import { ApplicationWrapper } from '../../../tests/helpers';

const mockContainerProps = {
  name: 'test namr',
  description: 'test description',
  owner: 'test owner',
  query: [{ '0': { field: 'mockField', operator: 'eq', value: 'foo' } }],
};

describe('CostContainerBuilder', () => {
  let result: any;
  beforeEach(() => {
    const mockToggleContainerList = (value: boolean) => {};
    render(<CostContainerBuilder toggleContainerList={mockToggleContainerList} containerProps={mockContainerProps} />, {
      wrapper: ApplicationWrapper,
    });
  });

  test('renders CostContainerBuilder component', () => {
    expect(screen.getByText(/Reset/i)).toBeInTheDocument();
    expect(screen.getByText(/Container Name/i)).toBeInTheDocument();
  });
});
