import React from 'react';
import ServiceConnections from './ServiceConnections';
import { Card, Divider } from 'semantic-ui-react';
import { ServiceConnectionContent } from './ServiceConnectionContent';
import { useSelector } from 'react-redux';
import { reduxState } from '../../services/redux/reduxState';
import { PageContent } from '../../pages/__styles__/DefaultPageStyles';
import { PageTitle } from '../PageTitle';
import { ProviderImage } from '../ProviderImage';

const ServiceConnection = () => {
  const ServiceProviders = useSelector(
    (state) => state[reduxState.SERVICE_PROVIDERS].providers
  );

  return (
    <PageContent>
      <PageTitle title="Service Connections" />
      <Divider />
      <Card.Group itemsPerRow={2}>
        {ServiceConnections.filter((item) => item.active).map((item, index) => {
          console.log(item);
          return (
            <Card key={index} color={item.color}>
              <Card.Content>
                <ProviderImage
                  floated="left"
                  provider={item.provider}
                  size="tiny"
                />
                <Card.Header>{item.name}</Card.Header>
                <Card.Meta>{item.description}</Card.Meta>
                <Card.Meta>{item.details}</Card.Meta>
              </Card.Content>
              <Card.Content extra>
                {ServiceProviders.filter(
                  (provider) => provider.type === item.provider
                ).map((provider, index) => {
                  return (
                    <ServiceConnectionContent
                      key={index}
                      platform={item.name}
                      vendor={item.vendor}
                      connectionName={item.connectionName}
                      // connectionCount={provider.billingAccounts.length}
                    />
                  );
                })}
              </Card.Content>
            </Card>
          );
        })}
      </Card.Group>
    </PageContent>
  );
};

export default ServiceConnection;
