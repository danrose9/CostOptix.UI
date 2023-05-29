import * as React from 'react';
import { Table, Icon, Label, Dropdown, Segment, Header, Divider, Container } from 'semantic-ui-react';
import styled from 'styled-components';
import TinyLineChart from '../../components/charts/TinyLineChart';
import { TableContainer, SegmentHeader, SegmentName } from '../__styles__/DefaultPageStyles';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import StandardLineChart from '../../components/charts/StandardLineChart';

export interface ICostContainerDetailProps {}

const config = {
  width: 150,
  height: 30,
};

interface CostContainerDetailProps {
  container: any;
}

const chartData = {
  container: { height: 300 },
  xAxis: {
    xAxisLabel: {},
    xAxisKey: 'name',
  },
  yAxis: { yAxisLabel: { value: 'value' } },
  line: { lineKey: 'value' },
};

export const CostContainerDetail: React.FC<CostContainerDetailProps> = ({ container }) => {
  console.log(container);
  return (
    <TableContainer>
      <Segment color="orange">
        <SegmentHeader>
          <SegmentName>Details</SegmentName>
          <Dropdown icon="ellipsis horizontal" simple item open={false} />
        </SegmentHeader>
        <h3>{container.name}</h3>
        <Divider />
        {container.description}
        <Table basic="very">
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Header as="h4">
                  <Header.Content>Owner</Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>{container.owner}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Header as="h4">
                  <Header.Content>Created by</Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>{container.createdBy}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Header as="h4" image>
                  <Header.Content>Created on</Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>{container.created}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Header as="h4" image>
                  <Header.Content># of resources</Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>{container.resourceCount}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Header as="h4" image>
                  <Header.Content>Status</Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>
                <Label size="medium" horizontal color="orange">
                  Enabled
                </Label>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <Segment>
          <StandardLineChart
            chartContainer={chartData.container}
            xAxis={chartData.xAxis}
            chartData={container.data}
            line={chartData.line}
            yAxis={chartData.yAxis}
          />
          <LineChart
            width={500}
            height={300}
            data={container.data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </Segment>
      </Segment>
    </TableContainer>
  );
};

export default CostContainerDetail;
