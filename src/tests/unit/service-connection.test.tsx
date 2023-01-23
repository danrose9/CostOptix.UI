import React from 'react';
import { render, cleanup, screen, fireEvent, within, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ServiceConnectionTable from '../../components/connections/ServiceConnectionTable';
import { ServiceConnections as ServiceConnectionCard } from '../../components/connections/ServiceConnections';
import { ApplicationWrapper } from '../helpers';
import userEvent from '@testing-library/user-event';

afterEach(() => {
  cleanup();
});

describe('Common Service Connection', () => {
  const user = userEvent.setup();

  test('Add new connection should render correct modal', () => {});
  test('Close button should close modal', () => {});

  test('More button should render dropdown', async () => {
    const { getByTestId } = render(<ServiceConnectionTable card={ServiceConnectionCard[0]} />, {
      wrapper: ApplicationWrapper,
    });

    const scDropdown = screen.queryByTestId('sc-dropdown') as HTMLElement;
    // console.log('** scDropdown **', getByTestId);

    expect(screen.queryByText('Manage Service') as HTMLElement).not.toBeInTheDocument();
    // expect(screen.queryByText('Manage Service') as HTMLElement).not.toBeInTheDocument();
    // expect(screen.queryByText('Manage Service') as HTMLElement).not.toBeInTheDocument();
    // expect(screen.queryByText('Manage Service') as HTMLElement).not.toBeInTheDocument();

    await user.click(scDropdown);
    // fireEvent.mouseOver(screen.getByText('sc-dropdown'));
    // expect(screen.getByText('Manage Service') as HTMLElement).toBeInTheDocument();
    // await waitFor(() => screen.getByTestId('sc-dropdown'));

    // expect(menuItems.length).toBe(4);
    // expect(display.textContent).toBe('Manage Service');
    //
  });
});

describe('Azure Service Connection', () => {
  test('Continue button should be enabled on valid fill', () => {});
  test('Continue button should be disabled on invalid form', () => {});
});

describe('AWS Service Connection', () => {
  test('', () => {});
});
