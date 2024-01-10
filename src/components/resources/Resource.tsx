import React from 'react';
import { Grid } from 'semantic-ui-react';
import { PageWrapper } from '../pages';
import { useSelector } from 'react-redux';
import { reduxState } from '../../services/redux/reduxState';
import { IRootState } from '../../services/redux/rootReducer';
import { currencySymbol } from '../../utils/helper';
import { DashboardCardGroup } from '../__styles__/CardStyles';
import ResourceCard from '../cards/ResourceCard';

interface IResourceProps {}

const resourceCards = [
  {
    title: 'Cost',
    value: 'amount30Day',
    description: '32.4% increase in the last 30 days',
    icon: 'dollar sign',
  },
  {
    title: 'Cost',
    value: 'growth30Day',
    description: '12.3% increase in last year',
    icon: 'percent',
  },
  {
    title: 'Growth',
    value: 'growth12Month',
    description: '12.7% growth over the last year',
    icon: 'chart line',
  },
];

const Resource: React.FunctionComponent<IResourceProps> = (props) => {
  const { data, isLoading, isAvailable } = useSelector((state: IRootState) => state[reduxState.RESOURCES]).view;
  return (
    <PageWrapper title={'Resource View'}>
      {data.length === 0 ? null : (
        <>
          <Grid data-testid="resource-view">
            <Grid.Row centered columns={3}>
              <DashboardCardGroup itemsPerRow={3}>
                {resourceCards?.map((card, index) => {
                  const content = () => {
                    if (card.icon === 'dollar sign') {
                      return currencySymbol(data.currency) + data[card.value];
                    } else if (card.icon === 'percent') {
                      return data[card.value] + '%';
                    }
                  };

                  return (
                    <ResourceCard
                      key={index}
                      title={card.title}
                      description={card.description}
                      icon={card.icon}
                      //   iconsize="large"
                      content={'$45.56'}
                    />
                  );
                })}
              </DashboardCardGroup>
            </Grid.Row>
          </Grid>
          {/* <Grid columns="equal">
            <Grid.Column floated="left" width={6}>
              <ResourceViewTable data={data} />
            </Grid.Column>
            <Grid.Column floated="right" width={10}>
              <ResourceViewChart content={data.monthlySpend} />
            </Grid.Column>
          </Grid>
          <ResourceViewChartData data={data} /> */}
        </>
      )}
    </PageWrapper>
  );
};

export default Resource;
