import React from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, LineChart, Legend } from 'recharts';

export interface IStandardLineChartProps {
  chartContainer: { height?: number; width?: number };
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
  const { height = 400, width = 900 } = props.chartContainer;
  const { xAxisLabel, xAxisKey } = props.xAxis;
  const { value, offset = -5, position = 'bottom' } = xAxisLabel;
  const { color = '#8884d8', lineKey, strokeWidth = 3, dot = true } = props.line;
  const { yAxisLabel } = props.yAxis;
  const { angle = -90 } = yAxisLabel;

  return (
    <LineChart
      width={width}
      height={height}
      data={props.chartData}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={xAxisKey} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey={lineKey} stroke={color} activeDot={{ r: 8 }} dot={dot} />
    </LineChart>
  );
};

export default StandardLineChart;
