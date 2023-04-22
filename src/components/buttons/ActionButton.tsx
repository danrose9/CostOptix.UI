import React from 'react';
import { Icon, SemanticCOLORS, SemanticICONS, Popup } from 'semantic-ui-react';

export interface IActionButton {
  name: SemanticICONS | undefined;
  color: SemanticCOLORS | undefined;
  content: string;
  onClick?: () => void;
}

const ActionButton = ({ name, color, content }: IActionButton) => {
  return <Popup trigger={<Icon name={name} color={color} />} content={content} position="top left" />;
};

export default ActionButton;
