import React from 'react';
import { LineChart, Line } from 'recharts';

type ConfigType = {
  width: number;
  height: number;
  color?: string;
};

type PropsType = {
  data: any;
  config?: ConfigType;
};

const TinyLineChart = ({ data, config }: PropsType) => {
  return (
    <LineChart
      width={config?.width}
      height={config?.height}
      data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={3} dot={false} />
    </LineChart>
  );
};

export default TinyLineChart;
