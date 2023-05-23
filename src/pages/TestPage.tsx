import React from 'react';
import { Button, Segment } from 'semantic-ui-react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
import StandardLineChart, { IStandardLineChartProps } from '../components/charts/LineChart';

// import { refreshCostDashboard } from '../services/redux/reducers/costDashboardSlice';
const lineChartData = {
  color: 'red',
};

const response = {
  container: {},
  xAxis: {
    label: { value: 'month' },
    xAxisKey: 'name',
  },
  data: [
    {
      name: 'January',
      purchased: 4000,
      consumed: 2400,
    },
    {
      name: 'February',
      purchased: 3000,
      consumed: 1398,
    },
    {
      name: 'March',
      purchased: 2000,
      consumed: 9800,
    },
    {
      name: 'April',
      purchased: 2780,
      consumed: 3908,
    },
    {
      name: 'May',
      purchased: 1890,
      consumed: 4800,
    },
    {
      name: 'June',
      purchased: 2390,
      consumed: 3800,
    },
    {
      name: 'July',
      purchased: 3490,
      consumed: 4300,
    },
  ],
  line: { lineKey: 'purchased' },
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
          />
        </Segment>
      </div>
    </>
  );
};

export default TestPage;
