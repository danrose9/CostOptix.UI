import React, { Fragment } from 'react';
import { Card, Divider } from 'semantic-ui-react';

export const TooltipDescription = (instance) => {
  const { service, resourceName } = instance.instance;
  return (
    <Fragment>
      <Card.Description>
        <strong>Service</strong> : {service}
      </Card.Description>
      <Card.Description>
        <strong>Resource</strong> : {resourceName}
      </Card.Description>
      <Divider />
    </Fragment>
  );
};
export default TooltipDescription;
