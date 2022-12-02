import React from 'react';
import { Card } from 'semantic-ui-react';
import { ServiceConnectionTable } from './ServiceConnectionTable';

const ExtraContentAccordion = (props) => {
  return (
    <Card.Content extra>
      <ServiceConnectionTable
        platform={props.platform}
        vendor={props.vendor}
        connectionName={props.connectionName}
      />
    </Card.Content>
  );
};

export const ServiceConnectionContent = (props) => {
  return (
    <div>
      <ExtraContentAccordion
        platform={props.platform}
        provider={props.provider}
        vendor={props.vendor}
        connectionName={props.connectionName}
        connectionCount={props.connectionCount}
      />
    </div>
  );
};
