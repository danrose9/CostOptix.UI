import styled from 'styled-components';
import { Modal, Header } from 'semantic-ui-react';

export const ModalHeader = styled(Header)`
  &&& {
    display: flex;
    align-items: center;
  }
`;

export const ActionButtons = styled(Modal.Content)`
  &&& {
    display: flex;
    justify-content: space-between;
  }
`;
