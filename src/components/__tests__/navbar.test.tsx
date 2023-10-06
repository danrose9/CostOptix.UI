import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { store } from '../../services/redux/store';
import { Provider } from 'react-redux';
import Navbar from '../navbar/Navbar';
import { NavbarMode } from '../navbar/NavbarMode';
import NavbarItems from '../navbar/NavbarItems';
import { BrowserRouter as Router } from 'react-router-dom';

afterEach(() => {
  cleanup();
});

describe('Navbar', () => {
  test('should render Navbar', () => {
    render(
      <Provider store={store}>
        <Router>
          <Navbar onClick={undefined} />
        </Router>
      </Provider>
    );
  });
});

describe('Navbar Dropdown Items', () => {
  test('should render Organization Mode', () => {
    const status = 'Demo';
    render(<NavbarMode status={status} />);
    const navbarMode = screen.getByTestId('navbarItem-1');
    expect(navbarMode).toBeInTheDocument();
    expect(navbarMode).toHaveTextContent('Signed in with Demo mode');
  });

  test('Logout option should be disabled in Demo mode', () => {
    render(
      <Provider store={store}>
        <Router>
          <NavbarItems />
        </Router>
      </Provider>
    );
    const navbarItems = screen.getByTestId('navbarItem-2');
    expect(navbarItems).toBeInTheDocument();
  });
});
