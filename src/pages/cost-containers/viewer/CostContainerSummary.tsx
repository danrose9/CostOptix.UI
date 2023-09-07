import React from 'react';
import { Button, Card, Label, Header, Icon, Popup } from 'semantic-ui-react';
import { ICostContainer } from '../../../types/container-types';
import { ProviderImage } from '../../../components/ProviderImage';
import { ButtonGroup } from '../../../components/__styles__/ButtonStyles';
import { ContainerAction } from '../../../types/container-types';

export interface ICostContainerSummaryProps {
  data: ICostContainer;
  handleContainerAction?: (id: string | null, action: ContainerAction) => void;
}

export const CostContainerSummary: React.FC<ICostContainerSummaryProps> = (props) => {
  const { data, handleContainerAction } = props;
  const { id, name, owner, description, cloudProviders, amount30DayConverted, resourceCount } = data;
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
        <Card.Content extra>
          <Popup
            trigger={
              <Label size="large" style={{ cursor: 'pointer' }}>
                <Icon name="folder open outline" /> {resourceCount}
              </Label>
            }
            content="Number of resources"
            basic
            position="top left"
          />
        </Card.Content>
      </Card>
      <ButtonGroup className="absolute-position">
        <Button onClick={() => handleContainerAction && handleContainerAction(id, ContainerAction.EDIT)}>Edit</Button>
        <Button positive onClick={() => handleContainerAction && handleContainerAction(id, ContainerAction.CLOSE)}>
          Close
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default CostContainerSummary;
