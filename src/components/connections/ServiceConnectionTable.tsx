import React from 'react';
import { Table, Dropdown, Icon, Card } from 'semantic-ui-react';
import { formatDateFull } from '../../utils/helper';
import { ICustomerServiceConnections, ICustomerConnectedProviders } from '../../types';

const CustomerConnectedProviders = [
  {
    id: 'e7a8e7cc-9f6d-48f3-90e4-281c193d98e7',
    createdDate: '2021-10-18T18:01:40.717247',
    accountId: 'DemoAzureProvider',
    accountName: 'CostOptix (costoptix.onmicrosoft.com)',
    connected: true,
    type: 'Azure',
  },
  {
    id: 'aec9f3e1-f68e-4ad4-8667-7cb9b71b5545',
    createdDate: '2021-09-08T12:21:44.717247',
    accountId: 'DemoAzureProvider2',
    accountName: 'CostOptix Dev(costoptix.onmicrosoft.com)',
    connected: false,
    type: 'Azure',
  },
  {
    id: 'aec9f3e1-f68e-4ad4-8667-7cb9b71b5545',
    createdDate: '2021-09-08T12:21:44.717247',
    accountId: 'DemoAzureProvider3',
    accountName: 'CostOptix QA(costoptix.onmicrosoft.com)',
    connected: false,
    type: 'Azure',
  },
  {
    id: 'aec9f3e1-f68e-4ad4-8667-7cb9b71b5545',
    createdDate: '2021-09-08T12:21:44.717247',
    accountId: 'DemoAzureProvider4',
    accountName: 'CostOptix Staging(costoptix.onmicrosoft.com)',
    connected: true,
    type: 'Azure',
  },
  {
    id: 'aec9f3e1-f68e-4ad4-8667-7cb9b71b5545',
    createdDate: '2021-09-08T12:21:44.717247',
    accountId: 'DemoAzureProvider5',
    accountName: 'CostOptix EU(costoptix.onmicrosoft.com)',
    connected: true,
    type: 'Azure',
  },
  {
    id: 'aec9f9e1-f68e-4ad4-8667-7cb9b71b5545',
    createdDate: '2021-09-08T12:21:44.717247',
    accountId: 'AWSOrg',
    accountName: 'AWS Organization',
    connected: true,
    type: 'AWS',
  },
];

export const ServiceConnectionTable = (props: ICustomerServiceConnections) => {
  return (
    <Card.Content>
      <Table size="small">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Billing Name</Table.HeaderCell>
            <Table.HeaderCell />
            <Table.HeaderCell>Registration Date</Table.HeaderCell>
            <Table.HeaderCell>Connected</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {CustomerConnectedProviders.filter(
            (provider: ICustomerConnectedProviders) => provider.type === props.card.provider
          ).map((provider, index) => {
            return (
              <Table.Row key={index}>
                <Table.Cell>{provider.accountName}</Table.Cell>
                <Table.Cell>
                  <Dropdown icon="ellipsis horizontal" style={{ zIndex: 'auto' }} simple>
                    <Dropdown.Menu>
                      <Dropdown.Item icon="settings" text="Manage Service" />
                      <Dropdown.Item icon="sync" text="Re-sync" />
                      <Dropdown.Item icon="mute" text="Disable" />
                      <Dropdown.Item icon="trash" text="Remove" />
                    </Dropdown.Menu>
                  </Dropdown>
                </Table.Cell>
                <Table.Cell>{formatDateFull(provider.createdDate)}</Table.Cell>

                <Table.Cell textAlign="center">
                  {provider.connected ? (
                    <Icon color="green" name="checkmark" size="large" />
                  ) : (
                    <Icon color="red" name="cancel" size="large" />
                  )}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </Card.Content>
  );
};

export default ServiceConnectionTable;
