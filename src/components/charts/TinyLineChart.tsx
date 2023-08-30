import React from 'react';
import { LineChart, Line } from 'recharts';

export interface ITinyLineChartProps {
  width: number;
  height: number;
  data: any;
  dataKey: string;
}

const TinyLineChart = (props: ITinyLineChartProps) => {
  console.log('TinyLineChart props', props);
  const { dataKey, width = 150, height = 50, data } = props;
  return (
    <LineChart width={width} height={height} data={data} margin={{ top: 5, right: 10, left: 20, bottom: 5 }}>
      <Line type="monotone" dataKey={dataKey} stroke="#8884d8" strokeWidth={3} dot={false} />
    </LineChart>
  );
};

export default TinyLineChart;
