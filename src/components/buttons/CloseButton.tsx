import React from 'react';
import { Icon } from 'semantic-ui-react';
import styled from 'styled-components';

const StyledIcon = styled.div`
  position: absolute;
  cursor: pointer;
  top: 1em;
  right: 1em;
  color: #01b5ad;
`;

interface ICloseButtonProps {
  onClick?: () => void;
}

const CloseButton: React.FC<ICloseButtonProps> = ({ onClick }) => {
  return (
    <StyledIcon onClick={onClick} data-testid="close-button">
      <Icon name="close" size="large" role="button"></Icon>
    </StyledIcon>
  );
};

export default CloseButton;
