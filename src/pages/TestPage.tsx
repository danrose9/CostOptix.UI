import React from 'react';
import { Button, Segment } from 'semantic-ui-react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
import StandardLineChart, { IStandardLineChartProps } from '../components/charts/StandardLineChart';
import TinyLineChart from '../components/charts/TinyLineChart';
import { formatDateToShort } from '../utils/helper';

// import { refreshCostDashboard } from '../services/redux/reducers/costDashboardSlice';
const lineChartData = {
  color: 'red',
};

const response = {
  container: {},
  xAxis: {
    xAxisLabel: {},
    xAxisKey: 'name',
  },
  data: [
    {
      name: '2021-01-01',
      purchased: 4000,
      consumed: 2400,
    },
    {
      name: '2021-02-01',
      purchased: 3000,
      consumed: 1398,
    },
    {
      name: '2021-03-01',
      purchased: 2000,
      consumed: 9800,
    },
    {
      name: '2021-04-01',
      purchased: 2780,
      consumed: 3908,
    },
    {
      name: '2021-05-01',
      purchased: 1890,
      consumed: 4800,
    },
    {
      name: '2021-06-01',
      purchased: 2390,
      consumed: 3800,
    },
    {
      name: '2021-07-01',
      purchased: 3490,
      consumed: 4300,
    },
  ],
  line: { lineKey: 'purchased' },
  yAxis: { yAxisLabel: { value: 'amount' } },
};

const tinyChart = {
  container: { width: 15, height: 30 },
  xAxis: {
    xAxisLabel: {},
  },
  data: [
    {
      name: '2021-01-01',
      purchased: 4000,
    },
    {
      name: '2021-02-01',
      purchased: 3000,
    },
    {
      name: '2021-03-01',
      purchased: 2000,
    },
    {
      name: '2021-04-01',
      purchased: 2780,
    },
    {
      name: '2021-05-01',
      purchased: 1890,
    },
    {
      name: '2021-06-01',
      purchased: 2390,
    },
    {
      name: '2021-07-01',
      purchased: 3490,
    },
  ],
  line: { lineKey: 'purchased' },
  yAxis: { yAxisLabel: { value: 'amount' } },
};

// pass in function formatDataToShort to tickformatter
const tickFormatter = (input: string) => {
  return formatDateToShort(input);
};

const TestPage = () => {
  return (
    <>
      <div style={{ width: '50vw' }}>
        <Segment color="blue">
          <StandardLineChart
            chartContainer={response.container}
            xAxis={response.xAxis}
            chartData={response.data}
            line={response.line}
            yAxis={response.yAxis}
            tickFormatter={tickFormatter}
          />
        </Segment>
        <Segment color="blue">
          <TinyLineChart width={150} height={30} data={tinyChart.data} dataKey="purchased" />
        </Segment>
      </div>
    </>
  );
};

export default TestPage;
