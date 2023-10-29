import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from 'src/services/redux/store';
import { Store } from '@reduxjs/toolkit';
import Account from '../Account'; // Adjust the import path accordingly
import { IRootState } from 'src/services/redux/rootReducer'; // Adjust the import path accordingly
import { BrowserRouter as Router } from 'react-router-dom';

const mockStore: Store<IRootState> = store;

describe('Account Component', () => {
  beforeEach(() => {
    render(
      <Provider store={mockStore}>
        <Router>
          <Account />
        </Router>
      </Provider>
    );
  });

  test('should load the Account component', () => {
    expect(screen.getByText('Personal Information')).toBeInTheDocument();
    expect(screen.getByText('Company Information')).toBeInTheDocument();
    expect(screen.getByText('Account')).toBeInTheDocument();
  });
});
