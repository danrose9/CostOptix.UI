import React from 'react';
import { render, fireEvent, screen, getByPlaceholderText, getAllByRole, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import QueryFilter from '../QueryFilter';
import FilterGroup from '../FilterGroup';
import { CostContainerTable, CostContainerBuilder } from '../../pages/cost-containers/index';
import { INITIAL_FILTER } from '../../../reducers/updateFilterReducer';
import userEvent from '@testing-library/user-event';
import wait from '@testing-library/user-event';

describe('FilterGroup', () => {
  let result;
  const mockFunction = jest.fn();

  beforeEach(() => {
    result = render(
      <QueryFilter updateSetIsQueryValid={mockFunction} dispatch={mockFunction} activeQuery={INITIAL_FILTER} />
    );
  });

  test('renders QueryFilter component', () => {
    expect(screen.getByText(/Reset/i)).toBeInTheDocument();
  });

  // test('dispatch function is called when Reset button is clicked', () => {
  //   const resetButton = screen.getByText(/Reset/i);
  //   fireEvent.click(resetButton);

  //   // Enable QueryFilter to be able to test the dispatch function
  //   const showQueryOption = screen.getByText('Show Query');
  //   fireEvent.click(showQueryOption);

  //   const filterGroups = screen.getAllByTestId('filter-group');
  //   expect(filterGroups.length).toBe(1);
  //   expect(screen.getByText('Query: [{"0":{"field":"","operator":"","value":""}}]')).toBeInTheDocument();
  // });

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

  test('should update isSelectionField and options based on field and operator selection', async () => {
    const user = userEvent.setup();
    const fieldDropdown = screen.getByTestId('field-dropdown');
    const operatorDropdown = screen.getByTestId('operator-dropdown');
    const typeValueDropdown = screen.getByTestId('type-value-dropdown');

    // Check if the dropdown is rendered
    expect(fieldDropdown.children[0].textContent).toBe('Select field');

    await user.click(fieldDropdown);
    const fieldDropdownOptions = getAllByRole(fieldDropdown, 'option');

    // Check if the number of field options are correct
    expect(fieldDropdownOptions.length).toBe(10);
    await user.click(fieldDropdownOptions[2]);

    // Wait for the expected change to occur before checking field option is available
    await waitFor(() => {
      expect(screen.getByText('Provider')).toBeInTheDocument();
    });

    // Check if the operator dropdown is rendered
    expect(operatorDropdown.children[0].textContent).toBe('Select operator');
    await user.click(operatorDropdown);
    const operatorDropdownOptions = getAllByRole(operatorDropdown, 'option');

    // Check if the number of operator options are correct
    expect(operatorDropdownOptions.length).toBe(6);

    // Check if the select value dropdown is rendered
    await user.click(operatorDropdownOptions[3]);

    // Wait for the expected change to occur before checking operator option is available
    await waitFor(() => {
      expect(screen.getByText('equal to')).toBeInTheDocument();
    });
  });
});
