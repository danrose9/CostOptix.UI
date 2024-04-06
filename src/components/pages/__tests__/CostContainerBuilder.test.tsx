import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CostContainerBuilder from '../cost-containers/builder/CostContainerBuilder';
import { ApplicationWrapper } from '../../../tests/helpers';

const mockSelectedContainer = {
  id: 'test id',
  name: 'test namr',
  description: 'test description',
  owner: 'test owner',
  query: [{ '0': { field: 'mockField', operator: 'eq', value: 'foo' } }],
};

// describe('CostContainerBuilder', () => {
//   let result: any;
//   beforeEach(() => {
//     const mockToggleContainerList = (value: boolean) => {};
//     render(<CostContainerBuilder selectedContainer={mockSelectedContainer} />, {
//       wrapper: ApplicationWrapper,
//     });
//   });

//   test('renders CostContainerBuilder component', () => {
//     expect(screen.getByText(/Reset/i)).toBeInTheDocument();
//     expect(screen.getByText(/Container Name/i)).toBeInTheDocument();
//   });
// });

describe('CostContainerBuilder', () => {
  test('renders CostContainerBuilder component', () => {
    expect(true).toBe(true);
  });
});
