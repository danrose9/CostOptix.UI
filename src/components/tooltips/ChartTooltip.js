import React from 'react';
import { Card } from 'semantic-ui-react';
import { ProviderImage } from '../ProviderImage';

export const ChartTooltip = ({ instance, label, symbol }) => {
  return (
    <Card raised>
      {instance?.map((provider, index) => {
        return (
          <Card.Content key={index} extra>
            <ProviderImage
              floated="right"
              size="mini"
              provider={provider.name}
            />
            <Card.Header>{provider.name}</Card.Header>
            <Card.Meta>
              {symbol}
              {provider.value}
            </Card.Meta>
          </Card.Content>
        );
      })}
      <Card.Content textAlign="right">
        <Card.Description>{label}</Card.Description>
      </Card.Content>
    </Card>
  );
};
export default ChartTooltip;
