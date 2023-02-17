import React from 'react';
import { Table, Dropdown, Popup } from 'semantic-ui-react';
import { formatDateFull } from '../../utils/helper';
import ServiceConnectionOptions from './ServiceConnectionOptions';
import { billingAccountStatus, statusType } from '../shared';
import { AccountProps } from 'billingaccount-types';

// interface IOptions {
//   event: React.MouseEvent<HTMLDivElement, MouseEvent>;
//   text: DropdownItemProps;
// }

// interface IServiceConnectionOptions {
//   icon: SemanticICONS;
//   text: string;
//   service: JSX.Element;
// }

export const ServiceConnectionTable = ({ account }: AccountProps, index: any) => {
  const statusIcon = billingAccountStatus[account.status as keyof statusType];

  return (
    <>
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
            <Dropdown.Menu data-testid="sc-dropdown-options">
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
    </>
  );
};

export default ServiceConnectionTable;
