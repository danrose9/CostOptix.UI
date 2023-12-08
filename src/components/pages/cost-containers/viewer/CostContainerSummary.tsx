import React from 'react';
import { Button, Card, Label, Header, Icon, Popup } from 'semantic-ui-react';
import { ICostContainer } from '../../../../types/container-types';
import { ProviderImage } from '../../../ProviderImage';
import { ButtonGroup } from '../../../buttons/Button.styles';
import { ContainerAction } from '../../../../types/container-types';
import styled from 'styled-components';

const StyledLabel = styled(Label)`
  cursor: pointer;
`;

export interface ICostContainerSummaryProps {
  data: ICostContainer;
  handleContainerAction?: (id: string | null, action: ContainerAction) => void;
}

export const CostContainerSummary: React.FC<ICostContainerSummaryProps> = (props) => {
  const { data, handleContainerAction } = props;
  const { id, name, owner, description, cloudProviders, resourceCount } = data;
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
              <Label size="large" as={StyledLabel}>
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
