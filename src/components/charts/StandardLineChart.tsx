import React from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, LineChart } from 'recharts';

export interface IStandardLineChartProps {
  chartContainer: { height?: number };
  chartData: any;
  line: { lineKey: string; color?: string; strokeWidth?: number; dot?: boolean };
  xAxis: IChartXAxis;
  yAxis: IChartYAxis;
}

interface IChartXAxis {
  xAxisLabel: IChartXAxisLabel;
  xAxisKey?: string;
}

interface IChartXAxisLabel {
  value?: string;
  offset?: number;
  position?: string;
}

interface IChartYAxis {
  yAxisLabel: {
    value?: string;
    angle?: number;
  };
}

const StandardLineChart: React.FC<IStandardLineChartProps> = (props: IStandardLineChartProps) => {
  const { height = 400 } = props.chartContainer;
  const { xAxisLabel, xAxisKey } = props.xAxis;
  const { value, offset = -5, position = 'bottom' } = xAxisLabel;
  const { color = '#82ca9d', lineKey, strokeWidth = 3 } = props.line;
  const { yAxisLabel } = props.yAxis;
  const { angle = -90 } = yAxisLabel;

  return (
    <ResponsiveContainer height={height}>
      <LineChart
        data={props.chartData}
        margin={{
          top: 5,
          right: 3,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey={xAxisKey}
          // tickFormatter={formatDate}
          label={{
            value: value,
            offset: offset,
            position: position,
          }}
        />
        <YAxis yAxisId="right" orientation="right" />
        <YAxis label={{ value: value, angle: angle }} />
        <Tooltip />
        <Line yAxisId="right" type="monotone" dataKey={lineKey} stroke={color} strokeWidth={strokeWidth} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default StandardLineChart;
