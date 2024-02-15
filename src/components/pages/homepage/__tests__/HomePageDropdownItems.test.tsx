import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { HomePageDropdownItems } from '../HomePageDropdownItems';
import * as appRoutes from '../../../../app/router/appRoutes';
import { createMemoryHistory } from 'history';

describe('HomePageDropdownItems', () => {
  const history = createMemoryHistory();

  const renderComponent = () =>
    render(
      <BrowserRouter>
        <HomePageDropdownItems />
      </BrowserRouter>
    );

  it('navigates to Privacy page on click', async () => {
    renderComponent();
    const privacyOption = await screen.findByRole('option', { name: 'Privacy' });
    userEvent.click(privacyOption);

    // Use waitFor to wait for a specific condition to be true
    await waitFor(() => {
      // For example, wait for the URL to change
      expect(window.location.pathname).toEqual(appRoutes.PRIVACY);
    });
  });

  it('navigates to Terms of Service page on click', async () => {
    renderComponent();
    const termsOption = await screen.findByRole('option', { name: 'Terms of Service' });
    userEvent.click(termsOption);

    // Use waitFor to wait for a specific condition to be true
    await waitFor(() => {
      // For example, wait for the URL to change
      expect(window.location.pathname).toEqual(appRoutes.TERMS);
    });
  });
});
