import React from 'react';
import { Button, Card, Container, Header, Segment } from 'semantic-ui-react';
import { ICostContainer } from '../../../types/container-types';
import { ProviderImage } from '../../../components/ProviderImage';
import { ButtonGroup } from '../../../components/__styles__/ButtonStyles';

export interface ICostContainerSummaryProps {
  handleClose: (e: any) => void;
  data: ICostContainer;
}

export const CostContainerSummary: React.FC<ICostContainerSummaryProps> = (props) => {
  const { handleClose, data } = props;
  const { name, owner, description, cloudProviders, amount30DayConverted } = data;
  return (
    <div>
      <Card fluid>
        <Card.Content>
          <Header textAlign="right">
            {cloudProviders
              ? cloudProviders.map((provider, index) => (
                  <ProviderImage key={index} provider={provider} size="big" floated="right" />
                ))
              : null}
          </Header>
          <Card.Header>{name}</Card.Header>
          <Card.Meta>{owner}</Card.Meta>
          <Card.Description>{description}</Card.Description>
        </Card.Content>
      </Card>
      <ButtonGroup className="absolute-position">
        <Button positive>Edit</Button>
        <Button onClick={handleClose}>Close</Button>
      </ButtonGroup>
    </div>
  );
};

export default CostContainerSummary;
