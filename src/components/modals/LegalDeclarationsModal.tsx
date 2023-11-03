import React, { useState } from 'react';
import { Button, Icon, Modal, SemanticICONS } from 'semantic-ui-react';
import styled from 'styled-components';

const StyledText = styled.p`
  cursor: pointer;
  color: #1f70bf;
  padding-left: 5px;
`;

const HeaderComponents = styled(Modal.Header)`
  display: flex !important;
  justify-content: space-between !important;
  align-items: flex-end !important;
`;

const LastUpdated = styled.p`
  font-size: 0.6em;
  font-weight: 100;
`;

interface ILegalDeclarationsModalProps {
  children: React.ReactNode;
  header: string;
  lastUpdated?: string;
  icon?: SemanticICONS;
}

const LegalDeclarationsModal: React.FC<ILegalDeclarationsModalProps> = ({ children, header, lastUpdated, icon }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <Modal
      open={openModal}
      onClose={() => setOpenModal(false)}
      onOpen={() => setOpenModal(true)}
      trigger={<StyledText>{header}</StyledText>}
    >
      <HeaderComponents>
        {header}
        {lastUpdated && <LastUpdated>Last updated: {lastUpdated}</LastUpdated>}
      </HeaderComponents>

      <Modal.Content image scrolling>
        <Icon name={icon} size="big" />

        <Modal.Description>{children}</Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpenModal(false)} positive data-testid="close-legal-modal-button">
          OK
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default LegalDeclarationsModal;
