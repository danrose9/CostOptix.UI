import React, { useState } from 'react';
import { Modal, Button, Icon, SemanticICONS, Dropdown } from 'semantic-ui-react';

interface IServiceConnectionOptions {
  icon: SemanticICONS;
  text: string;
  service: JSX.Element;
}

export const ServiceConnectionOptions = () => {
  return (
    <>
      <Dropdown.Item icon="settings" text="Manage Service" />
      <Dropdown.Item icon="sync" text="ReSync" />
      <Dropdown.Item icon="mute" text="Disable" />
      <Remove />
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

export const options = [
  {
    icon: 'settings' as SemanticICONS,
    text: 'Manage Service',
    service: () => Manage(),
  },
  {
    icon: 'sync' as SemanticICONS,
    text: 'Re-Sync',
    service: () => Sync(),
  },
  {
    icon: 'mute' as SemanticICONS,
    text: 'Disable',
    service: () => Disable(),
  },
  {
    icon: 'trash' as SemanticICONS,
    text: 'Remove',
    service: () => Remove(),
  },
];

const Remove = () => {
  const [open, setOpen] = useState(false);

  const handleRemoveConnection = () => {};

  return (
    <>
      <Modal
        trigger={<Dropdown.Item icon="trash" text="Remove" />}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
      >
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

const Disable = () => {
  console.log('Disable');
  return (
    <>
      <Modal.Header>Disable</Modal.Header>
      <Modal.Content>
        <Modal.Description>Your subscription has been confirmed</Modal.Description>
      </Modal.Content>
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
