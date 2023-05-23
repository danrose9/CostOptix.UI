import React from 'react';
import { Segment, SemanticCOLORS } from 'semantic-ui-react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, LineChart, Legend } from 'recharts';
import { Container } from 'react-dom';

export interface IStandardLineChartProps {
  chartContainer: { height?: number };
  chartData: any;
  line: { lineKey: string; color?: string; strokeWidth?: number };
  xAxis: IChartXAxis;
  //   yAxis: ChartYAxisType;
}

interface IChartXAxis {
  label: IChartXAxisLabel;
  xAxisKey?: string;
}

interface IChartXAxisLabel {
  value?: string;
  offset?: number;
  position?: string;
}

interface IChartYAxis {
  orientation: string;
  label: {
    value: string;
    angle: number;
  };
  yAxisId: string;
}

const StandardLineChart: React.FC<IStandardLineChartProps> = (props: IStandardLineChartProps) => {
  const { height = 400 } = props.chartContainer;
  const { label, xAxisKey } = props.xAxis;
  const { value, offset = -5, position = 'bottom' } = label;
  const { color = '#82ca9d', lineKey, strokeWidth = 3 } = props.line;

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
        <YAxis label={{ value: 'amount', angle: -90 }} />
        <Tooltip />

        <Line yAxisId="right" type="monotone" dataKey={lineKey} stroke={color} strokeWidth={strokeWidth} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default StandardLineChart;
