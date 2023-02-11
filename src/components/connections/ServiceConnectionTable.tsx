import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { reduxState } from '../../services/redux/reduxState';
import { Table, Dropdown, Popup, Card, DropdownItemProps, Modal, SemanticICONS } from 'semantic-ui-react';
import { formatDateFull } from '../../utils/helper';
import { ICustomerServiceConnection, ICustomerConnectedProviders } from '../../types';
import { IRootState } from '../../services/redux/rootReducer';
import ServiceConnectionOptions from './ServiceConnectionOptions';
import { billingAccountStatus, statusType } from '../shared';

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
            <Table.HeaderCell textAlign="center">Status</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {CustomerConnectedProviders.filter(
            (account: ICustomerConnectedProviders) => account.provider === props.card.provider
          ).map((account: ICustomerConnectedProviders, index: any) => {
            const statusIcon = billingAccountStatus[account.status as keyof statusType];

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
                    open={false}
                  >
                    <Dropdown.Menu>
                      <ServiceConnectionOptions billingAccounts={account} />
                    </Dropdown.Menu>
                  </Dropdown>
                </Table.Cell>
                <Table.Cell>{formatDateFull(account.createdDate)}</Table.Cell>
                <Popup
                  trigger={
                    <Table.Cell textAlign="center" style={{ cursor: 'pointer' }}>
                      {statusIcon}
                    </Table.Cell>
                  }
                  position="right center"
                  basic
                  content={account.status}
                />
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </Card.Content>
  );
};

export default ServiceConnectionTable;
