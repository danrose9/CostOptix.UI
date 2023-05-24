import React from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, LineChart } from 'recharts';

export interface IStandardLineChartProps {
  chartContainer: { height?: number };
  chartData: any;
  line: IChartLine;
  xAxis: IChartXAxis;
  yAxis: IChartYAxis;
  tickFormatter?: (input: string) => void;
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

interface IChartLine {
  lineKey: string;
  color?: string;
  strokeWidth?: number;
  dot?: boolean;
}

const StandardLineChart: React.FC<IStandardLineChartProps> = (props: IStandardLineChartProps, { tickFormatter }) => {
  /* Set default values for props */
  const { height = 400 } = props.chartContainer;
  const { xAxisLabel, xAxisKey } = props.xAxis;
  const { value, offset = -5, position = 'bottom' } = xAxisLabel;
  const { color = '#82ca9d', lineKey, strokeWidth = 3, dot = true } = props.line;
  const { yAxisLabel } = props.yAxis;
  const { angle = -90 } = yAxisLabel;

  console.log(tickFormatter);
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
          tickFormatter={tickFormatter}
          label={{
            value: value,
            offset: offset,
            position: position,
          }}
        />
        <YAxis yAxisId="right" orientation="right" />
        <YAxis label={{ value: value, angle: angle }} />
        <Tooltip />
        <Line yAxisId="right" type="monotone" dataKey={lineKey} stroke={color} strokeWidth={strokeWidth} dot={dot} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default StandardLineChart;
