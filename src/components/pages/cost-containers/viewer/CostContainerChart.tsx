import React from 'react';
import StandardLineChart from '../../../charts/StandardLineChart';
import { IMonthlySpend } from '../../../../types/resource-types';
import { orderAndFormatArray } from '../../../../utils/arrayFormatter';

export interface ICostContainerChartProps {
  data: IMonthlySpend[] | undefined;
}

const chartConfig = {
  container: { width: 800, height: 400 },
  xAxis: {
    xAxisLabel: {},
    xAxisKey: 'periodEnd',
  },
  yAxis: { yAxisLabel: { yAxisName: 'cost' } },
  line: { lineKey: 'amountConverted', strokeWidth: 2 },
};

export const CostContainerChart: React.FC<ICostContainerChartProps> = ({ data }) => {
  const { container, xAxis, yAxis, line } = chartConfig;

  const orderData = orderAndFormatArray(data || [], 'periodEnd');

  return (
    <>
      <StandardLineChart
        chartData={orderData}
        chartContainer={{
          height: container.height,
          width: container.width,
        }}
        line={line}
        xAxis={xAxis}
        yAxis={yAxis}
      />
    </>
  );
};

export default CostContainerChart;
