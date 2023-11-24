import React from 'react';
import { Table, Dropdown, Popup } from 'semantic-ui-react';
import { formatDateFull } from '../../utils/helper';
import ServiceConnectionOptions from './ServiceConnectionOptions';
import { billingAccountStatusType, IBillingAccountStatus } from '../../types/shared';
import { IBillingAccountProps } from '../../types';
import { StyledDropDown } from './__styles__/StyledServiceConnections';

export const ServiceConnectionRow = ({ billingAccount }: IBillingAccountProps, index: any) => {
  const statusIcon = billingAccountStatusType[billingAccount.status as keyof IBillingAccountStatus];

  return (
    <>
      <Table.Row key={index} product-tour="service-connection">
        <Table.Cell>{billingAccount.accountName}</Table.Cell>
        <Table.Cell>
          <StyledDropDown
            icon="ellipsis horizontal"
            simple
            item
            data-testid="sc-dropdown"
            direction="left"
            open={false}
          >
            <Dropdown.Menu data-testid="sc-dropdown-options">
              <ServiceConnectionOptions billingAccount={billingAccount} />
            </Dropdown.Menu>
          </StyledDropDown>
        </Table.Cell>
        <Table.Cell>{formatDateFull(billingAccount.createdDate)}</Table.Cell>
        <Popup
          trigger={<Table.Cell textAlign="center">{statusIcon}</Table.Cell>}
          position="right center"
          basic
          content={billingAccount.status}
        />
      </Table.Row>
    </>
  );
};

export default ServiceConnectionRow;
