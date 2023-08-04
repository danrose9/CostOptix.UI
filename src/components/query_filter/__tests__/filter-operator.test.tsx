import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FilterOperator from '../FilterOperator';

describe('FilterOperator', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    render(<FilterOperator dispatch={mockDispatch} index={0} />);
  });

  test('renders FilterOperator component', () => {
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  test('calls dispatch when component is rendered', () => {
    expect(mockDispatch).toHaveBeenCalled();
  });

  test('calls dispatch and updates state when dropdown value changes', () => {
    const dropdownOption = screen.getByTestId('conditional-operator');
    fireEvent.click(dropdownOption);
    expect(mockDispatch).toHaveBeenCalled();

    // This assumes that the dropdown renders the selected value as text
    expect(screen.getByText('or')).toBeInTheDocument();
  });
});
