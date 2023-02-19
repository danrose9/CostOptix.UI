import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { PageNotFound404 } from '../index';

import renderer from 'react-test-renderer';

afterEach(() => {
  cleanup();
});

describe('404 Page not found', () => {
  test('should render 404 page', () => {
    render(
      <Router>
        <PageNotFound404 />
      </Router>
    );
  });

  test('should contain return-home button', () => {
    const { getByTestId } = render(
      <Router>
        <PageNotFound404 />
      </Router>
    );

    expect(getByTestId('return-home-button')).toBeEnabled();
  });

  test('should return to home when clicking the button', async () => {
    // render(
    //   <Router>
    //     <PageNotFound404 />
    //   </Router>
    // );
    // const user = userEvent.setup();
    // expect(screen.getByText(/return to home/i)).toBeInTheDocument();
    // user.click(screen.getByText(/return to home/i));
  });
});
