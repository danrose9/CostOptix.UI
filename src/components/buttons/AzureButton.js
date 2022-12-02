import React from 'react';
import { Button } from 'semantic-ui-react';
import styled from 'styled-components';
const StyledButton = styled(Button)`
  &&& {
    background-color: #324ea8;
    color: white;
    width: 100%;
    height: 45px;
    font-size: 16px;
  }
`;

export const AzureSignInButton = (props) => {
  return (
    <StyledButton onClick={props.onClick}>{props.buttonText}</StyledButton>
  );
};

export default AzureSignInButton;
