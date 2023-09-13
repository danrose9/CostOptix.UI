import React from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, LineChart } from 'recharts';
import { Segment } from 'semantic-ui-react';
import { formatDate } from '../../../utils/helper';

export const ResourceViewChart = (props) => {
  return (
    <Segment color="orange">
      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          data={props.content}
          margin={{
            top: 5,
            right: 3,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="periodEnd"
            tickFormatter={formatDate}
            label={{
              value: 'month',
              offset: -5,
              position: 'bottom',
            }}
          />
          <YAxis yAxisId="right" orientation="right" />
          <YAxis label={{ value: 'amount', angle: -90 }} />
          <Tooltip />

          <Line yAxisId="right" type="monotone" dataKey="amount" stroke="#82ca9d" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </Segment>
  );
};

export default ResourceViewChart;
