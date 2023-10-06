/*
 * Copyright (c) 2023 DDIWARE
 * ALL RIGHTS RESERVED
 */

import React, { useCallback } from 'react';
import { Card } from 'semantic-ui-react';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import { AddServiceAzure } from '../../components/connections/index';
import AddServiceConnectionModal from '../connections/AddServiceConnectionModal';
import { ServiceConnections as ServiceConnectionCard } from '../../components/connections/ServiceConnections';
import { ServiceConnection } from '../../components/connections/index';
import { ApplicationWrapper } from '../../tests/helpers';
import userEvent from '@testing-library/user-event';
import { ServiceConnectionProviderType, IProviderProps } from 'provider-types';
import { ServiceConnections as ServiceConnectionCards } from '../connections/ServiceConnections';

afterEach(() => {
  cleanup();
});

describe('page should render with billing accounts', () => {
  beforeEach(() => {
    render(
      <ServiceConnection>
        {ServiceConnectionCards.filter((card) => card.active).map((card, index) => {
          return (
            <Card key={index}>
              <Card.Content>
                <Card.Header>{card.name}</Card.Header>
              </Card.Content>
            </Card>
          );
        })}
      </ServiceConnection>,
      {
        wrapper: ApplicationWrapper,
      }
    );
  });

  test('page should render', () => {
    expect(screen.getByText('Service Connections')).toBeTruthy();
  });

  test('correct number of service providers should show', async () => {
    // get the number of active cards
    var activeCards = ServiceConnectionCards.filter((card) => card.active).length;

    const items = await screen.findAllByAltText('ServiceProviderLogo');

    // test for only one child element
    expect(items).toHaveLength(activeCards);
  });
});

const getButtonByName = (btnName: string | RegExp) => {
  const regName = new RegExp(btnName, 'i');

  return screen.getByRole('button', { name: regName });
};

const RenderServiceConnectionModal = (card: ServiceConnectionProviderType) => {
  return render(
    <AddServiceConnectionModal cloudProvider={card}>
      <AddServiceAzure />
    </AddServiceConnectionModal>,
    { wrapper: ApplicationWrapper }
  );
};

describe('add service connection modal', () => {
  const user = userEvent.setup();
  const card = ServiceConnectionCard[1];

  const updateFormData = (formData: any) => {};

  beforeEach(() => {
    RenderServiceConnectionModal(card);
  });

  test('should render initial modal and close modal', () => {
    // Check button is in dom
    const addNewBtn = getButtonByName('Add new connection');
    expect(addNewBtn).toBeInTheDocument();
    fireEvent.click(addNewBtn);

    // Check 'Close' button is in dom
    const closeButton = getButtonByName('Close');
    const continueButton = getButtonByName('Continue');

    // Check buttons render
    expect(closeButton).toBeInTheDocument();
    expect(continueButton).toBeInTheDocument();
    expect(continueButton).toBeDisabled();

    fireEvent.click(closeButton);
    expect(continueButton).not.toBeInTheDocument();
  });

  test('Azure service connection form accepts input and is valid', () => {
    const addNewBtn = getButtonByName('Add new connection');
    fireEvent.click(addNewBtn);

    const applicationId = screen.getByRole('textbox', { name: /applicationId/i });
    const secretValue = screen.getByPlaceholderText('Secret Value');
    const directoryId = screen.getByRole('textbox', { name: /directoryId/i });

    // check fields are available
    expect(applicationId).toBeInTheDocument();
    expect(secretValue).toBeInTheDocument();
    expect(directoryId).toBeInTheDocument();

    fireEvent.change(applicationId, { target: { value: '123' } });

    //check continue button is disabled
    expect(screen.getByRole('button', { name: 'Continue' })).toBeDisabled();

    fireEvent.change(secretValue, { target: { value: '123' } });
    fireEvent.change(directoryId, { target: { value: '123' } });

    expect(screen.getByRole('button', { name: 'Continue' })).toBeEnabled();
  });

  // 0 - {Office 365}, 1 - {Azure}, 2 - {AWS}, 3 - {SalesForce}, 4 - {Google}
  var providerArray = [1, 2];

  providerArray.forEach((n) => {
    const card = ServiceConnectionCard[n];

    test('the modal showing for ' + card.provider + ', is for the ' + card.provider + ' card', async () => {
      RenderServiceConnectionModal(card);

      const AddNewButton = screen.getAllByRole('button', { name: 'Add new connection' });

      fireEvent.click(AddNewButton[n - 1]);

      expect(screen.getByTestId('provider-steps-1')).toHaveTextContent(`Log into your ${card.provider} account`);
    });

    test('href links should work', () => {
      RenderServiceConnectionModal(card);

      const AddNewButton = screen.getAllByRole('button', { name: 'Add new connection' });

      fireEvent.click(AddNewButton[n - 1]);

      expect(screen.getByRole('link', { name: card.href })).toHaveAttribute('href', card.href);
    });
  });
});

// describe('list service connection modal', () => {
//   var cloudProvider: any = ServiceConnectionCards.filter((card) => card.provider === 'Azure');

//   const RenderServiceConnectionModal = render(
//     <ListServiceConnectionModal
//       disabled={false}
//       cloudProvider={cloudProvider}
//       formData={{
//         applicationId: undefined,
//         secretValue: undefined,
//         directoryId: undefined,
//       }}
//       updateSetError={undefined}
//       closeFormModal={undefined}
//     ></ListServiceConnectionModal>,
//     { wrapper: ApplicationWrapper }
//   );

//   test('test all elements are selected when select all is checked', () => {
//     // Unfinished
//   });
//   test('test all elements are selected when select all is unchecked', () => {
//     // Unfinished
//   });

//   test('cancel button returns to previous modal', () => {
//     // Unfinished
//   });
// });
