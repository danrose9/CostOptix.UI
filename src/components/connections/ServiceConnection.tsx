import React, { useState, createContext } from 'react';
import { useInterval } from '../../hooks/useInterval';
import { Card, Divider, Table } from 'semantic-ui-react';
import { PageLayout } from '../../pages';
import { ServiceConnectionPage } from '../../styles/StyledServiceConnections';
import { ServiceConnections as ServiceConnectionCards } from './ServiceConnections';
import ServiceConnectionRow from './ServiceConnectionRow';
import { ProviderImage } from '../ProviderImage';
import AddServiceConnectionModal from './AddServiceConnectionModal';
import { useSelector } from 'react-redux';
import { reduxState } from '../../services/redux/reduxState';
import { IRootState } from '../../services/redux/rootReducer';
import { ServiceConnectionProviderType } from 'provider-types';
import { useAppDispatch } from '../../services/redux/store';
import { fetchBillingAccounts } from '../../services/redux/thunks/serviceProvidersThunk';
import { IBillingAccount } from '../../types';

export const PollingContext = createContext<any>(false);

type ContainerProps = {
  children: React.ReactNode;
};

const ServiceConnection = (props: ContainerProps) => {
  const CustomerConnectedBillingAccounts = useSelector(
    (state: IRootState) => state[reduxState.SERVICE_PROVIDERS].billingAccounts
  );

  const [pollingInterval] = useState<number>(5000);
  const [isPolling, setIsPolling] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  useInterval(async () => {
    if (isPolling) {
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
      <PageLayout title="Service Connections">
        <ServiceConnectionPage>
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
                    <Table size="small" fixed striped selectable>
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
                          (billingAccount: IBillingAccount) => billingAccount.provider === card.provider
                        ).map((billingAccount: IBillingAccount, index: any) => {
                          return <ServiceConnectionRow billingAccount={billingAccount} key={index} />;
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
      </PageLayout>
    </PollingContext.Provider>
  );
};

export default ServiceConnection;
