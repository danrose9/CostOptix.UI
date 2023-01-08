import React from 'react';
import { Card, Divider } from 'semantic-ui-react';
import { ServiceConnectionPage } from '../../styles/StyledServiceConnections';
import { PageTitle } from '../PageTitle';
import { ServiceConnections as ServiceConnectionCards } from './ServiceConnections';
import ServiceConnectionTable from './ServiceConnectionTable';
import { ProviderImage } from '../ProviderImage';
import AddServiceConnectionModal from './AddServiceConnectionModal';

const ServiceConnection = () => {
  return (
    <ServiceConnectionPage>
      <PageTitle title="Service Connections" />
      <Divider />
      <Card.Group itemsPerRow={2}>
        {ServiceConnectionCards.filter((card) => card.active).map((card, index) => {
          return (
            <Card key={index} color={card.color as any} style={{ height: '100%' }}>
              <Card.Content>
                <ProviderImage floated="right" provider={card.provider} size="tiny" />
                <Card.Header>{card.name}</Card.Header>
                <Card.Meta>{card.description}</Card.Meta>
                <Card.Meta>{card.details}</Card.Meta>
              </Card.Content>
              <Card.Content extra>
                <ServiceConnectionTable card={card} />
              </Card.Content>
              <Card.Content extra>
                <AddServiceConnectionModal provider={card} />
              </Card.Content>
            </Card>
          );
        })}
      </Card.Group>
    </ServiceConnectionPage>
  );
};

export default ServiceConnection;
