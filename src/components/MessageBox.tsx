import React from 'react';
import { Message } from 'semantic-ui-react';

interface IMessageBox {
  title: string;
  message: string;
  color: undefined;
  size: undefined;
}

export const MessageBox = (props: IMessageBox) => {
  const {title, message, color, size} = props;

  return (
    <Message color={color} size={size}>
      <strong>{title}</strong>
      <p>{message}</p>
    </Message>
  );
};
