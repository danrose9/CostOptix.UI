import React from 'react';
import { Table, Dropdown, Popup } from 'semantic-ui-react';
import { formatDateFull } from '../../utils/helper';
import ServiceConnectionOptions from './ServiceConnectionOptions';
import { billingAccountStatusType, IBillingAccountStatus } from '../../types/shared';
import { IConnectedBillingAccountProps } from 'billingaccount-types';

export const ServiceConnectionRow = ({ billingAccount }: IConnectedBillingAccountProps, index: any) => {
  const statusIcon = billingAccountStatusType[billingAccount.status as keyof IBillingAccountStatus];

  return (
    <>
      <Table.Row key={index}>
        <Table.Cell>{billingAccount.accountName}</Table.Cell>
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
              <ServiceConnectionOptions billingAccounts={billingAccount} />
            </Dropdown.Menu>
          </Dropdown>
        </Table.Cell>
        <Table.Cell>{formatDateFull(billingAccount.createdDate)}</Table.Cell>
        <Popup
          trigger={
            <Table.Cell textAlign="center" style={{ cursor: 'pointer' }}>
              {statusIcon}
            </Table.Cell>
          }
          position="right center"
          basic
          content={billingAccount.status}
        />
      </Table.Row>
    </>
  );
};

export default ServiceConnectionRow;
