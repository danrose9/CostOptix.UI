import React, { useState } from 'react';
import { useAppDispatch } from '../../services/redux/store';
import { Modal, Button, Dropdown } from 'semantic-ui-react';

import { ICustomerConnectedProviders } from '../../types';

import {
  deleteBillingAccount,
  disableBillingAccount,
  enableBillingAccount,
} from '../../services/redux/thunks/serviceProvidersThunk';

interface IProps {
  billingAccount: ICustomerConnectedProviders;
}

export const ServiceConnectionOptions = (props: IProps) => {
  const { id, providerId } = props.billingAccount;

  return (
    <>
      <Dropdown.Item icon="settings" text="Manage Service" />
      <Dropdown.Item icon="sync" text="ReSync" />
      <Disable providerId={providerId} id={id} />
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

const Disable = (props: { providerId: string; id: string }) => {
  const [enabled, setEnabled] = useState(true);

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

const Manage = () => {
  console.log('MANAGE');
  return null;
};

export default ServiceConnectionOptions;
