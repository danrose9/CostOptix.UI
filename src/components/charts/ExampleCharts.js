import React, { PureComponent } from 'react';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  LineChart,
  Line,
} from 'recharts';

const exampleBarChartData = [
  {
    name: 'Exchange',
    available: 4,
    used: 3,
  },
  {
    name: 'OneDrive',
    available: 3,
    used: 2,
  },
  {
    name: 'Skype for Business',
    available: 2,
    used: 9,
  },
  {
    name: 'Teams',
    available: 3,
    used: 4,
  },
  {
    name: 'Yammer',
    available: 2,
    used: 5,
  },
  {
    name: 'SharePoint',
    available: 3.5,
    used: 4,
  },
];

export class ExampleBarChart extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          width={500}
          height={300}
          data={exampleBarChartData}
          margin={{
            top: 20,
            right: 30,
            left: 10,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis
            label={{
              value: 'Serviceplans',
              angle: -90,
            }}
          />
          <Tooltip />
          {/* <Legend /> */}
          <Bar dataKey="used" stackId="a" fill="#8884d8" />
          <Bar dataKey="available" stackId="a" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

const examplePieChartData = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export class ExamplePieChart extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <PieChart width={400} height={400}>
          <Pie
            data={examplePieChartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {examplePieChartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    );
  }
}

const exampleLineChartData = [
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
];

export class ExampleLineChart extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          width={500}
          height={300}
          data={exampleLineChartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="consumed"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="purchased"
            stroke="#82ca9d"
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
