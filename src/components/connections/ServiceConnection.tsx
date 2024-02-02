import React, { useState, createContext } from 'react';
import { useInterval } from '../../hooks/useInterval';
import { Card, Table } from 'semantic-ui-react';
import { PageWrapper } from '../pages';
import { ServiceConnectionPage, ServiceConnectionCard } from './__styles__/StyledServiceConnections';
import { ServiceConnections as ServiceConnectionCards } from './ServiceConnections';
import ServiceConnectionRow from './ServiceConnectionRow';
import { ProviderImage } from '../ProviderImage';
import AddServiceConnectionModal from './AddServiceConnectionModal';
import { useSelector } from 'react-redux';
import { reduxState } from '../../services/redux/reduxState';
import { IRootState } from '../../services/redux/rootReducer';
import { ServiceConnectionProviderType } from 'provider-types';
import { useAppDispatch } from '../../services/redux/store';
import { fetchBillingAccounts } from '../../services/redux/thunks/serviceProviderThunk';
import { IBillingAccount } from '../../types';
import Tour from '../productTour/Tour';
import { useLocation } from 'react-router-dom';

export const PollingContext = createContext<any>(false);

type SelectedContainerProps = {
  children?: React.ReactNode;
};

const ServiceConnection = (props: SelectedContainerProps) => {
  const CustomerConnectedBillingAccounts = useSelector(
    (state: IRootState) => state[reduxState.SERVICE_PROVIDERS].billingAccounts
  );

  const [pollingInterval] = useState<number>(5000);
  const [isPolling, setIsPolling] = useState<boolean>(false);

  const location = useLocation();
  const { startTour } = location.state || {};

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
    <>
      <Tour shouldStart={startTour} tourType={'newSignup'} />
      <PollingContext.Provider value={setIsPolling}>
        <PageWrapper title="Service Connections">
          <ServiceConnectionPage>
            <Card.Group itemsPerRow={2}>
              {ServiceConnectionCards.filter((card) => card.active).map((card, index) => {
                return (
                  <ServiceConnectionCard key={index} color={card.color as any} product-tour="service-connection-start">
                    <Card.Content>
                      <ProviderImage floated="right" provider={card.provider} size="tiny" />
                      <Card.Header>{card.name}</Card.Header>
                      <Card.Meta>{card.description}</Card.Meta>
                      <Card.Meta>{card.details}</Card.Meta>
                    </Card.Content>
                    <Card.Content extra>
                      <Table size="small" striped selectable>
                        <Table.Header>
                          <Table.Row>
                            <Table.HeaderCell>Billing Account</Table.HeaderCell>
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
                  </ServiceConnectionCard>
                );
              })}
            </Card.Group>
          </ServiceConnectionPage>
        </PageWrapper>
      </PollingContext.Provider>
    </>
  );
};

export default ServiceConnection;
