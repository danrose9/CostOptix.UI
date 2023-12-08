import React from 'react';
import { Icon, SemanticCOLORS, SemanticICONS, Popup } from 'semantic-ui-react';
import { StyledIcon } from './Button.styles';

export interface IActionButton {
  name: SemanticICONS | undefined;
  color: SemanticCOLORS | undefined;
  tooltip: string;
  onClick?: () => void;
  tooltipPosition?: 'top left' | 'top right' | 'bottom left' | 'bottom right' | 'right center' | 'left center';
}

const ActionButton: React.FC<IActionButton> = ({ name, color, tooltip, tooltipPosition, onClick }) => {
  return (
    <Popup
      trigger={<Icon name={name} color={color} size="large" as={StyledIcon} onClick={onClick} />}
      content={tooltip}
      position={tooltipPosition}
    />
  );
};

export default ActionButton;
