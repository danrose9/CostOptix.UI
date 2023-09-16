import React, { useState } from 'react';
import { Button, Icon, Modal } from 'semantic-ui-react';
import { TermsOfService } from '../../app/constants/TermsOfService';
import styled from 'styled-components';

const StyledText = styled.p`
  cursor: pointer;
  color: #1f70bf;
`;

const TermsOfServiceModal = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <Modal
      open={openModal}
      onClose={() => setOpenModal(false)}
      onOpen={() => setOpenModal(true)}
      trigger={<StyledText data-testid="terms-01">Terms of Service</StyledText>}
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
          OK
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default TermsOfServiceModal;
