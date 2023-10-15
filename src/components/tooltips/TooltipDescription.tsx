import React, { Fragment } from 'react';
import { Card, Divider } from 'semantic-ui-react';
import { getEmbeddedResourceName } from 'src/utils/stringFormatter';

interface ITooltipDescription {
  instance: {
    service: string;
    resourceName: string;
  };
}

const TooltipDescription: React.FC<ITooltipDescription> = ({ instance }) => {
  const { service, resourceName } = instance;

  return (
    <Fragment>
      <Card.Description>
        <strong>Service</strong> : {getEmbeddedResourceName(service)}
      </Card.Description>
      <Card.Description>
        <strong>Resource</strong> : {getEmbeddedResourceName(resourceName)}
      </Card.Description>
      <Divider />
    </Fragment>
  );
};
export default TooltipDescription;
