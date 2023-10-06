import React from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, Line, LineChart } from 'recharts';

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
  xAxisName?: string;
  offset?: number;
  xAxisLabelPosition?: string;
}

interface IChartYAxis {
  yAxisLabel: {
    yAxisName?: string;
    angle?: number;
    yAxisLabelposition?: string;
  };
}

interface IChartLine {
  lineKey: string;
  color?: string;
  strokeWidth?: number;
  dot?: boolean;
}

const StandardLineChart: React.FC<IStandardLineChartProps> = (props, { tickFormatter }) => {
  /* Set default values for props */
  const { height = 400, width = 900 } = props.chartContainer;
  const { xAxisLabel, xAxisKey } = props.xAxis;
  const { xAxisName, offset = 0, xAxisLabelPosition = 'insideBottom' } = xAxisLabel;
  const { color = '#8884d8', lineKey, strokeWidth = 3, dot = true } = props.line;
  const { yAxisLabel } = props.yAxis;
  const { yAxisName, yAxisLabelposition = 'left' } = yAxisLabel;

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
      <XAxis dataKey={xAxisKey} label={{ value: xAxisName, offset: offset, position: xAxisLabelPosition }} />
      <YAxis label={{ value: yAxisName, angle: -90, position: yAxisLabelposition }} />
      <Tooltip />
      <Line type="monotone" dataKey={lineKey} stroke={color} strokeWidth={strokeWidth} activeDot={{ r: 8 }} dot={dot} />
    </LineChart>
  );
};

export default StandardLineChart;
