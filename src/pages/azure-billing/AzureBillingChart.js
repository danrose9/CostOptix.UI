import React, { PureComponent } from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { formatDate } from '../../utils/helper';

export default class AzureBillingChartSample extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          data={this.props?.content?.billingInvoice?.invoices}
          margin={{
            top: 5,
            right: 3,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="invoiceDate"
            tickFormatter={formatDate}
            label={{
              value: 'invoice date',
              offset: -5,
              position: 'bottom',
            }}
          />
          <YAxis yAxisId="right" orientation="right" />
          <YAxis label={{ value: 'amount', angle: -90 }} />
          <Tooltip />

          <Line
            yAxisId="right"
            type="monotone"
            dataKey="totalAmount"
            stroke="#82ca9d"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
