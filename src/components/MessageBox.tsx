import React from 'react';
import { Message } from 'semantic-ui-react';
import { IMessageBox } from '../types';

export const MessageBox = (props: IMessageBox) => {
  const {title, message, color, size} = props;

  return (
    <Message color={color} size={size}>
      <strong>{title}</strong>
      <p>{message}</p>
    </Message>
  );
};

export default MessageBox;