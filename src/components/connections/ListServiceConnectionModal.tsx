import React from 'react';
import { Header, Modal } from 'semantic-ui-react';

const ListServiceConnectionModal: React.FC<any> = (props) => {
  console.log(props);
  return (
    <>
      <Modal onClose={() => props.onClose(false)} open={props.secondOpen} size="small">
        <Header icon>Billing Accounts found</Header>
        <Modal.Content>
          <p>Your inbox is getting full, would you like us to enable automatic archiving of old messages?</p>
        </Modal.Content>
        <Modal.Actions></Modal.Actions>
      </Modal>
    </>
  );
};

export default ListServiceConnectionModal;
