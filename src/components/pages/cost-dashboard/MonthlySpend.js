import React from 'react';
import { useSelector } from 'react-redux';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Bar, BarChart } from 'recharts';
import { Segment } from 'semantic-ui-react';
import { reduxState } from '../../../services/redux/reduxState';
import { ChartTooltip } from '../../tooltips/index';

export const MonthlySpend = (props) => {
  const monthlyCosts = useSelector((state) => state[reduxState.COST_DASHBOARD].monthlySpend.data);

  const isLoading = useSelector((state) => state[reduxState.COST_DASHBOARD].monthlySpend.isLoading);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return <ChartTooltip instance={payload} label={label} symbol={props.currency} />;
    } else return null;
  };

  return (
    <Segment color="orange" loading={isLoading} data-testid="cost-dashboard-chart">
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          width={500}
          height={300}
          data={monthlyCosts}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />

          <Bar dataKey="AWS" stackId="a" fill="#FF9900" />
          <Bar dataKey="Google" stackId="a" fill="#ffc658" />
          <Bar dataKey="Azure" stackId="a" fill="#008AD7" />
          <Bar dataKey="Microsoft" stackId="a" fill="#7FBA00" />
          <Bar dataKey="Salesforce" stackId="a" fill="#adceff" />
        </BarChart>
      </ResponsiveContainer>
    </Segment>
  );
};

export default MonthlySpend;
