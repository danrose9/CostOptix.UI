import React, { useState } from 'react';
import { Button, Icon, Modal } from 'semantic-ui-react';
import { TermsOfService } from '../../app/TermsOfService';

const TermsOfServiceModal = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <Modal
      data-testid="terms-02"
      open={openModal}
      onClose={() => setOpenModal(false)}
      onOpen={() => setOpenModal(true)}
      trigger={
        <Button data-testid="terms-01" primary>
          Terms of Service
        </Button>
      }
    >
      <Modal.Header>Terms of Service</Modal.Header>
      <Modal.Content image scrolling>
        <Icon name="handshake outline" size="huge" />

        <Modal.Description>
          <TermsOfService />
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpenModal(false)} positive>
          Ok
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default TermsOfServiceModal;
