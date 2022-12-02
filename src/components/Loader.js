import React from 'react';
import { Loader, Placeholder } from 'semantic-ui-react';

export const Spinner = (props) => {
  return (
    <Loader size={props.size} active inline="centered">
      {props.message}
    </Loader>
  );
};

export const Shimmer = (props) => {
  return (
    <Placeholder>
      <Placeholder.Header image>
        <Placeholder.Line />
        <Placeholder.Line />
      </Placeholder.Header>
      <Placeholder.Paragraph>
        <Placeholder.Line />
        <Placeholder.Line />
        <Placeholder.Line />
        <Placeholder.Line />
      </Placeholder.Paragraph>
    </Placeholder>
  );
};
