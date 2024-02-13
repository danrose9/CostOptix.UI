import React, { useEffect } from 'react';
import PageWrapper from '../pages/PageWrapper';
import { useLocation } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import { Spinner } from '../Loader';
import { DashboardCard } from '../index';
import ResourceViewChart from './ResourceViewChart';
import ResourceProfile from './ResourceProfile';
import ResourceViewChartData from './ResourceViewChartData';
import { useDispatch, useSelector } from 'react-redux';
import { FETCH_RESOURCES } from '../../services/redux/thunks/resourceThunk';
import { reduxState } from '../../services/redux/reduxState';
import { currencySymbol } from '../../utils/helper';
import { DashboardCardGroup } from '../__styles__/CardStyles';
import { formatGrowthValue } from '../../utils/valueFormatter';

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
  const { data, isLoading, isAvailable } = useSelector((state) => state[reduxState.RESOURCES]).view;

  const args = `${resource.billingAccountId}/${resource.id}`;

  const RenderView = () => {
    return (
      <>
        {data.length === 0 ? null : (
          <>
            <Grid data-testid="resource-view">
              <Grid.Row centered columns={3}>
                <DashboardCardGroup itemsPerRow={3}>
                  {dashboardCards?.map((card, index) => {
                    const content = () => {
                      if (card.icon === 'dollar sign') {
                        return currencySymbol(data.currency) + data[card.value];
                      } else if (card.icon === 'percent') {
                        return formatGrowthValue(data[card.value]);
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
                </DashboardCardGroup>
              </Grid.Row>
            </Grid>
            <Grid columns="equal">
              <Grid.Column floated="left" width={6}>
                <ResourceProfile data={data} />
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
      dispatch(FETCH_RESOURCES(args));
    }
  }, [dispatch, args, isAvailable]);

  return <PageWrapper title="Resource List">{isLoading ? <Spinner /> : <RenderView />}</PageWrapper>;
};

export default ResourceView;
