import React from 'react';
import { render, screen, fireEvent, waitFor, waitForElement } from '@testing-library/react';
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

  const hoverLegalButton = async () => {
    const legalButton = await screen.findByText('Legal');
    await waitFor(() => {
      userEvent.hover(legalButton);
    });
  };

  it('navigates to Privacy page on click', async () => {
    renderComponent();

    // wait for the button to appear on hover
    await hoverLegalButton();

    const privacyOption = await screen.findByTestId('privacy');
    userEvent.click(privacyOption);

    // Your waitFor usage is correct
    await waitFor(() => {
      expect(window.location.pathname).toEqual(appRoutes.PRIVACY);
    });
  });

  it('navigates to Terms of Service page on click', async () => {
    renderComponent();

    // wait for the button to appear on hover
    await hoverLegalButton();

    const termsOption = await screen.findByTestId('terms');
    userEvent.click(termsOption);

    await waitFor(() => {
      // For example, wait for the URL to change
      expect(window.location.pathname).toEqual(appRoutes.TERMS);
    });
  });
});
