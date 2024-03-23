import React from 'react';
import { Message as SemanticMessage, SemanticCOLORS } from 'semantic-ui-react';

interface MessageBoxProps {
  title: string;
  message: string;
  color: SemanticCOLORS;
}

export const MessageBox: React.FC<MessageBoxProps> = ({ title, message, color }) => {
  return (
    <SemanticMessage color={color}>
      <strong>{title}</strong>
      <p>{message}</p>
    </SemanticMessage>
  );
};

export default MessageBox;
