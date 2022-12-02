import React from 'react';
import { Card, Grid } from 'semantic-ui-react';
import { DashboardCard } from '../../components/index';

const dashboardCards = [
  {
    title: 'Previous Invoice',
    apiValue: 'lastInvoiceTotalAmount',
    description: 'Previous invoice amount',
    icon: 'dollar sign',
  },
  {
    title: 'Monthly Change',
    apiValue: 'lastInvoiceChangeAmount',
    description: 'Change from previous month',
  },
  {
    title: 'Monthly Change',
    apiValue: 'lastInvoiceChangePercent',
    description: '% Change from previous month',
    valueType: '%',
  },
  {
    title: 'Annual Change',
    apiValue: 'averageAnnualChangePercent',
    description: 'Change from previous year',
  },
  {
    title: 'Average Change',
    apiValue: 'averageMonthlyChangePercent',
    description: 'Average increase month by month',
  },
  {
    title: 'Average Invoice',
    apiValue: 'averageInvoiceTotalAmount',
    description: 'Average invoice over the last 12 months',
    icon: 'dollar sign',
  },
];

export const AzureBillingCards = (props) => {
  return (
    <Grid>
      <Grid.Row centered columns={6}>
        <Card.Group style={{ margin: '5px' }} itemsPerRow={6}>
          {dashboardCards.map((card, apiValue) => {
            function evaluateProps() {
              let content = 0;
              let icon = null;
              let iconColor = null;

              const value = props.content[card.apiValue];

              if (value > 0) {
                content = props.content[card.apiValue];
                icon = 'long arrow alternate up';
                iconColor = 'red';
              } else if (value < 0) {
                content = props.content[card.apiValue];
                icon = 'long arrow alternate down';
                iconColor = 'teal';
              } else {
                content = '0.00';
                icon = 'arrows alternate horizontal';
                iconColor = 'orange';
              }

              if (card.valueType === '%') {
                content = content + '%';
              } else content = props.currencySymbol + content;

              if (card.icon) {
                icon = card.icon;
              }

              return {
                content: content,
                icon: icon,
                iconColor: iconColor,
              };
            }

            return (
              <DashboardCard
                key={apiValue}
                title={card.title}
                icon={evaluateProps().icon}
                iconcolor={evaluateProps().iconColor}
                iconsize="big"
                content={evaluateProps().content}
                description={card.description}
              />
            );
          })}
        </Card.Group>
      </Grid.Row>
    </Grid>
  );
};
