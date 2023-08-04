import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import QueryFilter from '../QueryFilter';

describe('FilterGroup', () => {
  let result;
  beforeEach(() => {
    result = render(<QueryFilter updateSetIsQueryValid={jest.fn()} />);
  });

  test('renders QueryFilter component', () => {
    expect(screen.getByText(/Reset/i)).toBeInTheDocument();
  });

  test('dispatch function is called when Reset button is clicked', () => {
    const resetButton = screen.getByText(/Reset/i);
    fireEvent.click(resetButton);

    const filterGroups = screen.getAllByTestId('filter-group');
    expect(filterGroups.length).toBe(1);
    expect(screen.getByText('Query: [{"0":{"field":"","operator":"","value":""}}]')).toBeInTheDocument();
  });

  test('dispatch function is called when Add button is clicked', () => {
    const addButton = screen.getByTestId('add-button');
    fireEvent.click(addButton);
    // Check if the number of FilterGroup components has increased

    const filterGroups = screen.getAllByTestId('filter-group');

    expect(filterGroups.length).toBeGreaterThan(1);
  });

  test('dispatch function is called when Remove button is clicked', () => {
    const addButton = screen.getByTestId('add-button');
    fireEvent.click(addButton);

    const removeButton = screen.getByTestId('remove-button');
    fireEvent.click(removeButton);
    // Check if the number of FilterGroup components has decreased
    const filterGroups = screen.getAllByTestId('filter-group');
    expect(filterGroups.length).toBe(1);
  });
});
