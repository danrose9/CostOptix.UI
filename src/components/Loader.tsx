import React from 'react';
import { Loader, Placeholder } from 'semantic-ui-react';

export const Spinner = () => {
  return (
    <Loader size="large" active inline="centered">
      Fetching Data..
    </Loader>
  );
};

export const Shimmer = () => {
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
