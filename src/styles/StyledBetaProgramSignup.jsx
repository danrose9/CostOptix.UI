import styled from 'styled-components';
import { Form, Modal } from 'semantic-ui-react';

export const Border = styled.div`
  border: 0px;
`;

export const StyledText = styled.p`
  font-size: 1.2em;
  padding: 1em;
`;

export const StyledForm = styled(Form)`
  padding-top: 0;
`;

export const Actions = styled(Modal.Actions)`
  display: flex;
  flex-direction: row-reverse;
`;

export const StyledFormField = styled(Form.Field)`
  margin: 1em;
  padding: 1em 0;
  min-width: 25em;
`;