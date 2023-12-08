import React from 'react';
import { Icon } from 'semantic-ui-react';
import { StyledIcon } from './Button.styles';

interface ICloseButtonProps {
  onClick?: () => void;
}

const CloseButton: React.FC<ICloseButtonProps> = ({ onClick }) => {
  return (
    <StyledIcon className="absolute-position" onClick={onClick} data-testid="close-button">
      <Icon name="close" size="large" role="button"></Icon>
    </StyledIcon>
  );
};

export default CloseButton;
