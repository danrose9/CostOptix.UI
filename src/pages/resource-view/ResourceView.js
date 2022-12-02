import React, { useEffect } from 'react';
import { PageTitle } from '../../components/PageTitle';
import { useLocation } from 'react-router-dom';
import { Grid, Card, Loader } from 'semantic-ui-react';
import { DashboardCard } from '../../components/index';
import ResourceViewChart from './ResourceViewChart';
import ResourceViewTable from './ResourceViewTable';
import ResourceViewChartData from './ResourceViewChartData';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResourceView } from '../../services/redux/thunks/resourceThunk';
import { reduxState } from '../../services/redux/reduxState';
import { currencySymbol } from '../../utils/helper';
import { PageContent } from '../__styles__/DefaultPageStyles';

const dashboardCards = [
  {
    title: 'Amount last 30 days',
    value: 'amount30Day',
    description: 'Resource cost stated on the last 30 days',
    icon: 'dollar sign',
  },
  {
    title: 'Increase last 30 days',
    value: 'growth30Day',
    description: '% growth in last 30 days',
    icon: 'percent',
  },
  {
    title: 'Increase last 12 months',
    value: 'growth12Month',
    description: '% growth over the last year',
    icon: 'percent',
  },
];

export const ResourceView = () => {
  const location = useLocation();
  const resource = location.state.resource;

  const dispatch = useDispatch();
  const { data, isLoading, isAvailable } = useSelector(
    (state) => state[reduxState.RESOURCES]
  ).view;

  const args = `${resource.billingAccountId}/${resource.id}`;

  const RenderView = () => {
    return (
      <>
        {data.length === 0 ? null : (
          <>
            <Grid data-testid="resource-view">
              <Grid.Row centered columns={3}>
                <Card.Group style={{ margin: '5px' }} itemsPerRow={3}>
                  {dashboardCards?.map((card, index) => {
                    const content = () => {
                      if (card.icon === 'dollar sign') {
                        return currencySymbol(data.currency) + data[card.value];
                      } else if (card.icon === 'percent') {
                        return data[card.value] + '%';
                      }
                    };

                    return (
                      <DashboardCard
                        key={index}
                        title={card.title}
                        description={card.description}
                        icon={card.icon}
                        iconsize="large"
                        content={content()}
                      />
                    );
                  })}
                </Card.Group>
              </Grid.Row>
            </Grid>
            <Grid columns="equal">
              <Grid.Column floated="left" width={6}>
                <ResourceViewTable data={data} />
              </Grid.Column>
              <Grid.Column floated="right" width={10}>
                <ResourceViewChart content={data.monthlySpend} />
              </Grid.Column>
            </Grid>
            <ResourceViewChartData data={data} />
          </>
        )}
      </>
    );
  };

  useEffect(() => {
    if (!isAvailable) {
      dispatch(fetchResourceView(args));
    }
  }, [dispatch, args, isAvailable]);

  return (
    <>
      <PageContent>
        <PageTitle title="Resource View" />
        {isLoading ? (
          <Loader size="large" active>
            Fetching Data..
          </Loader>
        ) : (
          <RenderView />
        )}
      </PageContent>
    </>
  );
};

export default ResourceView;
