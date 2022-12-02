import React from 'react';
import { Table, Card, Dropdown, Icon } from 'semantic-ui-react';
import ServiceConnectionModal from './ServiceConnectionModal';

const CustomerServiceConnections = [
  {
    organization: 'Red Dog',
    registrationDate: 'September 14, 2021',
    registeredBy: 'dan@reddog32.com',
    connected: true,
  },
  {
    organization: 'Red Dog Development Tenant',
    registrationDate: 'January 11, 2022',
    registeredBy: 'admin@reddogdev.onmicrosoft.com',
    connected: true,
  },
  {
    organization: 'ManageSky',
    registrationDate: 'November 10, 2021',
    registeredBy: 'dougdavis7@managesky.com',
    connected: false,
  },
];

export const ServiceConnectionTable = (props) => {
  return (
    <>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Billing Name</Table.HeaderCell>
            <Table.HeaderCell />
            <Table.HeaderCell>Registration Date</Table.HeaderCell>
            <Table.HeaderCell>Connected</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {CustomerServiceConnections.map((item, index) => (
            <Table.Row key={index}>
              <Table.Cell>{item.organization}</Table.Cell>
              <Table.Cell>
                <Dropdown item icon="ellipsis horizontal">
                  <Dropdown.Menu>
                    <Dropdown.Item icon="settings" text="Manage Service" />
                    <Dropdown.Item icon="sync" text="Re-sync" />
                    <Dropdown.Item icon="mute" text="Disable" />
                    <Dropdown.Item icon="trash" text="Remove" />
                  </Dropdown.Menu>
                </Dropdown>
              </Table.Cell>
              <Table.Cell>{item.registrationDate}</Table.Cell>
              <Table.Cell>
                {item.connected ? (
                  <Icon color="green" name="checkmark" size="large" />
                ) : (
                  <Icon color="red" name="cancel" size="large" />
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Card.Content extra>
        <ServiceConnectionModal
          disabled={false}
          title="Add Connection"
          platform={props.platform}
          vendor={props.vendor}
          connectionName={props.connectionName}
        />
      </Card.Content>
    </>
  );
};
