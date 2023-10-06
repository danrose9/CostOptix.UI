import React from 'react';
import { Icon, SemanticCOLORS, SemanticICONS, Popup } from 'semantic-ui-react';
import styled from 'styled-components';

export interface IActionButton {
  name: SemanticICONS | undefined;
  color: SemanticCOLORS | undefined;
  content: string;
  onClick?: () => void;
}

export const ActionButtons = styled.div`
  display: table;
  cursor: pointer;
`;

const ActionButton = ({ name, color, content }: IActionButton) => {
  return <Popup trigger={<Icon name={name} color={color} size="large" />} content={content} position="top left" />;
};

export default ActionButton;
