import React, { Fragment, useState } from 'react';
import { Modal, Button, Dropdown, Label, Divider, Table } from 'semantic-ui-react';
import { ProviderImage } from '../../ProviderImage';
import { formatDateFull } from '../../../utils/helper';
import getSymbolFromCurrency from 'currency-symbol-map';

export const ManageServiceConnection = (props: {
  accountName: string;
  provider: string;
  id: string;
  status: string;
  createdDate: string;
  currency: string;
}) => {
  const [open, setOpen] = useState(false);

  const currencySymbol = getSymbolFromCurrency(props.currency);

  const TableRows = [
    { name: 'Tenant', value: 'My Tenant', extra: <></> },
    {
      name: 'Status',
      value: (
        <Label size="medium" horizontal color="orange">
          {props.status}
        </Label>
      ),
      extra: <StatusExtra />,
    },
    { name: 'Created', value: <Fragment>{formatDateFull(props.createdDate)}</Fragment>, extra: <></> },
    {
      name: 'Default Currency',
      value: (
        <Fragment>
          {props.currency} ({currencySymbol})
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
        <Modal.Content style={{ padding: '1em' }}>
          <ProviderImage provider={props.provider} size="tiny" floated="left" />
          <div>
            <h2 style={{ margin: '0.5rem' }}>{props.accountName}</h2>

            <div>{props.id}</div>
            <Divider />
            <Table fixed>
              <Table.Body>
                {TableRows.map((row, index) => {
                  return (
                    <Table.Row key={index}>
                      <Table.Cell width={5}>{row.name}</Table.Cell>
                      <Table.Cell width={5}>{row.value}</Table.Cell>
                      <Table.Cell width={4}>{row.extra}</Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button
            negative
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button>Validate</Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

const StatusExtra = () => {
  return <></>;
};

export default ManageServiceConnection;
