import React from 'react';
import { Header, Modal } from 'semantic-ui-react';

const ListServiceConnectionModal: React.FC<any> = (props) => {
  const { secondOpen } = props;
  return (
    <Modal open={secondOpen} size="fullscreen">
      <Header icon>Billing Accounts found</Header>
      <Modal.Content>
        <p>Your inbox is getting full, would you like us to enable automatic archiving of old messages?</p>
      </Modal.Content>
      <Modal.Actions></Modal.Actions>
    </Modal>
  );
};

export default ListServiceConnectionModal;
