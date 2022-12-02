import styled from 'styled-components';
import { Form, Button } from 'semantic-ui-react';

export const StyledForm = styled(Form)`
  &&& {
    border: 2px solid #dee2e6;
    background-color: #f8f9fa;
    padding: 20px 20px;
    margin-top: 40px;
  }
`;
export const StyledDivider = styled.div`
  padding: 10px;
`;

export const StyledColumn = {
  position: 'fixed',
  top: '30vh',
  maxWidth: '450px',
};

export const StyledHeader = styled.div`
  padding: 20px 10px;
`;

export const StyledCheckbox = styled.div`
  padding: 0;
`;

export const StyledInputContainer = styled.div`
  max-width: 70vw;
`;

export const StyledButton = styled(Button)`
  &&& {
    border: none;
    padding: 30;
    background: none;
    cursor: pointer;
    color: #4183c4;
  }
`;