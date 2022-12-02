import React, { PureComponent } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

export class StackedBarChart extends PureComponent {
  render() {
    const data = this.props.barChartData;
    const yAxisLabel = this.props.yAxisLabel;

    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          width={this.props.width}
          height={this.props.height}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 10,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={this.props.xAxisKey} />
          <YAxis
            label={{
              value: yAxisLabel,
              angle: -90,
            }}
          />
          <Tooltip />
          <Legend />
          <Bar dataKey={this.props.yAxisKeyA} stackId="a" fill="#8884d8" />
          <Bar dataKey={this.props.yAxisKeyB} stackId="a" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
