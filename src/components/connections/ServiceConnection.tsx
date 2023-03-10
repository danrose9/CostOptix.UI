import React from 'react';
import { Card, Divider, Table } from 'semantic-ui-react';
import { ServiceConnectionPage } from '../../styles/StyledServiceConnections';
import { PageTitle } from '../PageTitle';
import { ServiceConnections as ServiceConnectionCards } from './ServiceConnections';
import ServiceConnectionTable from './ServiceConnectionTable';
import { ProviderImage } from '../ProviderImage';
import AddServiceConnectionModal from './AddServiceConnectionModal';
import { useSelector } from 'react-redux';
import { reduxState } from '../../services/redux/reduxState';
import { IRootState } from '../../services/redux/rootReducer';
import { CustomerConnectedProvidersType } from 'billingaccount-types';
import { ServiceConnectionProviderType } from 'provider-types';

const ServiceConnection = () => {
  const CustomerConnectedProviders = useSelector(
    (state: IRootState) => state[reduxState.SERVICE_PROVIDERS].billingAccounts
  );

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
                <Table size="small">
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Billing Name</Table.HeaderCell>
                      <Table.HeaderCell />
                      <Table.HeaderCell>Registration Date</Table.HeaderCell>
                      <Table.HeaderCell textAlign="center">Status</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {CustomerConnectedProviders.filter(
                      (account: CustomerConnectedProvidersType) => account.provider === card.provider
                    ).map((account: CustomerConnectedProvidersType, index: any) => {
                      return <ServiceConnectionTable account={account} key={index} />;
                    })}
                  </Table.Body>
                </Table>
              </Card.Content>
              <Card.Content extra>
                <AddServiceConnectionModal cloudProvider={card as ServiceConnectionProviderType} />
              </Card.Content>
            </Card>
          );
        })}
      </Card.Group>
    </ServiceConnectionPage>
  );
};

export default ServiceConnection;
