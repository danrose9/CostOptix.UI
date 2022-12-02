import React from 'react';
import { Message } from 'semantic-ui-react';

export const MessageBox = (props) => {
  return (
    <Message color={props.color} size={props.size}>
      <strong>{props.title}</strong>
      <p>{props.message}</p>
    </Message>
  );
};
