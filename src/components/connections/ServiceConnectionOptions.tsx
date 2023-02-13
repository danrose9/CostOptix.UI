import React, { Fragment, useState } from 'react';
import { useAppDispatch } from '../../services/redux/store';
import { Modal, Button, Dropdown, Label, Container, Divider, Table } from 'semantic-ui-react';
import { ICustomerConnectedProviders } from '../../types';
import {
  deleteBillingAccount,
  disableBillingAccount,
  enableBillingAccount,
} from '../../services/redux/thunks/serviceProvidersThunk';
import { ProviderImage } from '../ProviderImage';
import styled from 'styled-components';
import { formatDateFull } from '../../utils/helper';

interface IProps {
  billingAccounts: ICustomerConnectedProviders;
}

export const ServiceConnectionOptions = ({ ...billingAccounts }: IProps) => {
  const { id, providerId, status, accountName, provider, createdDate } = billingAccounts.billingAccounts;

  var accountEnabled;
  if (status === 'Disabled') {
    accountEnabled = false;
  } else {
    accountEnabled = true;
  }

  return (
    <>
      <Manage accountName={accountName} provider={provider} id={id} status={status} createdDate={createdDate} />
      <Dropdown.Item icon="sync" text="ReSync" />
      <Disable providerId={providerId} id={id} accountStatus={accountEnabled as boolean} />
      <Remove providerId={providerId} id={id} />
      {/* {options.map((option, index) => {
        return (
          <Dropdown.Item key={index} onClick={option.service}>
            <Icon name={option.icon} loading={false} />
            {option.text}
          </Dropdown.Item>
        );
      })} */}
    </>
  );
};

// export const options = [
//   {
//     icon: 'settings' as SemanticICONS,
//     text: 'Manage Service',
//     service: () => Manage(),
//   },
//   {
//     icon: 'sync' as SemanticICONS,
//     text: 'Re-Sync',
//     service: () => Sync(),
//   },
//   {
//     icon: 'mute' as SemanticICONS,
//     text: 'Disable',
//     service: () => Disable(),
//   },
//   {
//     icon: 'trash' as SemanticICONS,
//     text: 'Remove',
//     service: () => Remove(),
//   },
// ];

const Remove = (props: { providerId: string; id: string }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleRemoveConnection = () => {
    const args = {
      id: props.id,
      providerId: props.providerId,
    };

    dispatch(deleteBillingAccount(args));
    setOpen(false);
  };

  return (
    <>
      <Modal trigger={<Dropdown.Item icon="trash" text="Remove" />} onOpen={() => setOpen(true)} open={open}>
        <Modal.Header>Remove Service Connection</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to permanently remove this service connection?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            positive
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button negative onClick={handleRemoveConnection}>
            Continue
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

const Disable = (props: { providerId: string; id: string; accountStatus: boolean }) => {
  const [enabled, setEnabled] = useState(props.accountStatus);

  // if (props.status === 'Disabled') {
  //   setEnabled(false);
  // }

  const dispatch = useAppDispatch();

  const handleOnClick = () => {
    const args = {
      id: props.id,
      providerId: props.providerId,
    };

    setEnabled(!enabled);
    if (enabled) {
      dispatch(disableBillingAccount(args));
    } else {
      dispatch(enableBillingAccount(args));
    }
  };

  return (
    <>
      {enabled ? (
        <Dropdown.Item icon="bell slash outline" text="Disable" onClick={handleOnClick} />
      ) : (
        <Dropdown.Item icon="bell outline" text="Enable" onClick={handleOnClick} />
      )}
    </>
  );
};

const Sync = () => {
  console.log('SYNC');
  return null;
};

const Manage = (props: { accountName: string; provider: string; id: string; status: string; createdDate: string }) => {
  const [open, setOpen] = useState(false);

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
                <Table.Row>
                  <Table.Cell>Status</Table.Cell>
                  <Table.Cell>
                    <Label size="medium" horizontal color="orange">
                      {props.status}
                    </Label>
                  </Table.Cell>
                  <Table.Cell></Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Created</Table.Cell>
                  <Table.Cell>{formatDateFull(props.createdDate)}</Table.Cell>
                  <Table.Cell></Table.Cell>
                </Table.Row>
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

export default ServiceConnectionOptions;
