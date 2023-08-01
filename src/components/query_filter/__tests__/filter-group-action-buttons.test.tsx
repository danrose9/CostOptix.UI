import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FilterGroupActionButtons from '../FilterGroupActionButtons';

describe('FilterGroupActionButtons', () => {
  const mockOnAddBtnClick = jest.fn();
  const mockOnRemoveBtnClick = jest.fn();
  const mockDispatch = jest.fn();

  beforeEach(() => {
    render(
      <FilterGroupActionButtons
        onAddBtnClick={mockOnAddBtnClick}
        onRemoveBtnClick={mockOnRemoveBtnClick}
        index={0}
        count={0}
        dispatch={mockDispatch}
      />
    );
  });

  test('renders FilterGroupActionButtons component', () => {
    expect(screen.getByTestId('add-button')).toBeInTheDocument();
    expect(screen.getByTestId('remove-button')).toBeInTheDocument();
  });

  test('calls onAddBtnClick when Add button is clicked', () => {
    const addButton = screen.getByTestId('add-button');
    fireEvent.click(addButton);
    expect(mockOnAddBtnClick).toHaveBeenCalled();
  });

  test('calls onRemoveBtnClick when Remove button is clicked', () => {
    const removeButton = screen.getByTestId('remove-button');
    fireEvent.click(removeButton);
    expect(mockOnRemoveBtnClick).toHaveBeenCalled();
  });

  test('calls dispatch when component is rendered', () => {
    expect(mockDispatch).toHaveBeenCalled();
  });
});
