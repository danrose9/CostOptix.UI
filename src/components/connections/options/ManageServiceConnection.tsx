import React, { Fragment, useState } from 'react';
import { Modal, Button, Dropdown, Label, Table, SemanticCOLORS } from 'semantic-ui-react';
import { ProviderImage } from '../../ProviderImage';
import { formatDateFull } from '../../../utils/helper';
import getSymbolFromCurrency from 'currency-symbol-map';
import { billingAccountColorType } from '../../../types/shared';
import { IBillingAccountProps } from '../../../types';
import { HeaderContent, HeaderInformation, HeaderName, AccountName, AccountId } from '../../__styles__/StyledModal';

export const ManageServiceConnection = ({ billingAccount }: IBillingAccountProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const { status, currency, createdDate, provider, accountName, id, statusReason } = billingAccount;

  const currencySymbol = getSymbolFromCurrency(currency);
  const color = billingAccountColorType[status as keyof typeof billingAccountColorType];

  const TableRows = [
    { name: 'Tenant', value: 'My Tenant', extra: <></> },
    {
      name: 'Status',
      value: (
        <>
          <Label size="medium" horizontal color={color as SemanticCOLORS}>
            {status}
          </Label>
        </>
      ),
      extra: <>{statusReason}</>,
    },
    { name: 'Created', value: <Fragment>{formatDateFull(createdDate)}</Fragment>, extra: <></> },
    {
      name: 'Default Currency',
      value: (
        <Fragment>
          {currency} ({currencySymbol})
        </Fragment>
      ),
      extra: <></>,
    },
  ];

  return (
    <>
      <Modal
        trigger={<Dropdown.Item icon="settings" text="Manage Service" />}
        onOpen={() => setOpen(true)}
        open={open}
        size="small"
      >
        <Modal.Header>Manage Service Connection</Modal.Header>
        <HeaderContent>
          <HeaderInformation>
            <ProviderImage provider={provider} size="tiny" floated="left" />
            <HeaderName>
              <AccountName>{accountName}</AccountName>

              <AccountId>{id}</AccountId>
            </HeaderName>
          </HeaderInformation>
        </HeaderContent>
        <Modal.Content>
          <Table fixed>
            <Table.Body>
              {TableRows.map((row, index) => {
                return (
                  <Table.Row key={index}>
                    <Table.Cell width={6}>{row.name}</Table.Cell>
                    <Table.Cell width={4}>{row.value}</Table.Cell>
                    <Table.Cell width={6}>{row.extra}</Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </Modal.Content>
        <Modal.Actions>
          <Button
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default ManageServiceConnection;
