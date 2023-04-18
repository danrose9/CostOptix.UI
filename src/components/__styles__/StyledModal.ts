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

export const HeaderInformation = styled.div`
  display: flex;
  align-items: center;
`;

export const HeaderContent = styled(Header.Content)`
  padding: 0.1em 1.5em !important;
`;

export const HeaderName = styled.div`
  padding: 0 1em;
`;

export const AccountName = styled.h2`
  margin: inherit;
`;

export const AccountId = styled.div``;
