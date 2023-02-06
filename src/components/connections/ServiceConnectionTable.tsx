import React from 'react';
import { useSelector } from 'react-redux';
import { reduxState } from '../../services/redux/reduxState';
import { Table, Dropdown, Icon, Card, DropdownItemProps, Modal, SemanticICONS } from 'semantic-ui-react';
import { formatDateFull } from '../../utils/helper';
import { ICustomerServiceConnection, ICustomerConnectedProviders } from '../../types';
import { IRootState } from '../../services/redux/rootReducer';
import ServiceConnectionOptions from './ServiceConnectionOptions';

interface IOptions {
  event: React.MouseEvent<HTMLDivElement, MouseEvent>;
  text: DropdownItemProps;
}

interface IServiceConnectionOptions {
  icon: SemanticICONS;
  text: string;
  service: JSX.Element;
}

export const ServiceConnectionTable = (props: ICustomerServiceConnection) => {
  const CustomerConnectedProviders = useSelector(
    (state: IRootState) => state[reduxState.SERVICE_PROVIDERS].billingAccounts
  );

  return (
    <Card.Content>
      <Table size="small">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Billing Name</Table.HeaderCell>
            <Table.HeaderCell />
            <Table.HeaderCell>Registration Date</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Connected</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {CustomerConnectedProviders.filter(
            (account: ICustomerConnectedProviders) => account.provider === props.card.provider
          ).map((account: ICustomerConnectedProviders, index: any) => {
            return (
              <Table.Row key={index}>
                <Table.Cell>{account.accountName}</Table.Cell>
                <Table.Cell>
                  <Dropdown
                    icon="ellipsis horizontal"
                    style={{ zIndex: 'auto' }}
                    simple
                    item
                    data-testid="sc-dropdown"
                    direction="left"
                  >
                    <Dropdown.Menu>
                      <ServiceConnectionOptions />
                    </Dropdown.Menu>
                  </Dropdown>
                </Table.Cell>
                <Table.Cell>{formatDateFull(account.createdDate)}</Table.Cell>

                <Table.Cell textAlign="center">
                  {account.connected ? (
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
