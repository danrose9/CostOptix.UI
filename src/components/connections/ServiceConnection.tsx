import React, { useEffect, useState, createContext, useContext } from 'react';
import { useInterval } from '../../hooks/useInterval';
import { Card, Divider, Table, Button } from 'semantic-ui-react';
import { ServiceConnectionPage } from '../../styles/StyledServiceConnections';
import { PageTitle } from '../PageTitle';
import { ServiceConnections as ServiceConnectionCards } from './ServiceConnections';
import ServiceConnectionRow from './ServiceConnectionRow';
import { ProviderImage } from '../ProviderImage';
import AddServiceConnectionModal from './AddServiceConnectionModal';
import { useSelector } from 'react-redux';
import { reduxState } from '../../services/redux/reduxState';
import { IRootState } from '../../services/redux/rootReducer';
import { ServiceProviderBillingAccountType } from 'service-provider-types';
import { ServiceConnectionProviderType } from 'provider-types';
import { useAppDispatch } from '../../services/redux/store';
import { disableBillingAccount, fetchBillingAccounts } from '../../services/redux/thunks/serviceProvidersThunk';

export const PollingContext = createContext<any>(false);

const ServiceConnection = () => {
  const CustomerConnectedBillingAccounts = useSelector(
    (state: IRootState) => state[reduxState.SERVICE_PROVIDERS].billingAccounts
  );

  const [pollingInterval, setPollingInterval] = useState<number>(5000);
  const [isPolling, setIsPolling] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const startPolling = () => setIsPolling(true);

  useInterval(async () => {
    if (isPolling) {
      console.log('polling..');
      const billingAccounts = await dispatch(fetchBillingAccounts());

      const pending: boolean = billingAccounts.payload.billingAccounts.some(
        ({ status }: { status: string }) => status === 'Pending'
      );

      if (!pending) {
        setIsPolling(false);
      }
    }
  }, pollingInterval);

  return (
    <PollingContext.Provider value={setIsPolling}>
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
                      {CustomerConnectedBillingAccounts.filter(
                        (account: ServiceProviderBillingAccountType) => account.provider === card.provider
                      ).map((account: ServiceProviderBillingAccountType, index: any) => {
                        return <ServiceConnectionRow billingAccount={account} key={index} />;
                      })}
                    </Table.Body>
                  </Table>
                </Card.Content>
                <Card.Content extra>
                  <AddServiceConnectionModal cloudProvider={card as ServiceConnectionProviderType} />
                  {/* <Button onClick={() => setIsPolling(!isPolling)}>Poll</Button> */}
                </Card.Content>
              </Card>
            );
          })}
        </Card.Group>
      </ServiceConnectionPage>
    </PollingContext.Provider>
  );
};

export default ServiceConnection;
