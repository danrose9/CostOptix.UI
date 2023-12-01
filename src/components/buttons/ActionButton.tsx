import React from 'react';
import { Icon, SemanticCOLORS, SemanticICONS, Popup } from 'semantic-ui-react';
import styled from 'styled-components';

export interface IActionButton {
  name: SemanticICONS | undefined;
  color: SemanticCOLORS | undefined;
  tooltip: string;
  onClick?: () => void;
  tooltipPosition?: 'top left' | 'top right' | 'bottom left' | 'bottom right' | 'right center' | 'left center';
}

export const ActionButtons = styled.div`
  display: table;
  cursor: pointer;
`;

const StyledIcon = styled(Icon)`
  padding: 0 1rem;
`;

const ActionButton: React.FC<IActionButton> = ({ name, color, tooltip, tooltipPosition }) => {
  return (
    <Popup
      trigger={<Icon name={name} color={color} size="large" as={StyledIcon} />}
      content={tooltip}
      tooltipPosition={tooltipPosition}
    />
  );
};

export default ActionButton;
