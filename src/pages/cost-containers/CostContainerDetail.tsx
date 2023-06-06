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
  expandContainer: (container: any) => void;
}

const chartData = {
  container: { width: 500, height: 300 },
  xAxis: {
    xAxisLabel: {},
    xAxisKey: 'name',
  },
  yAxis: { yAxisLabel: { value: 'value' } },
  line: { lineKey: 'value' },
};

export const CostContainerDetail: React.FC<CostContainerDetailProps> = (props) => {
  const { container, expandContainer } = props;

  const dropdownOptions = [
    { key: 'edit', text: 'Edit', value: 'edit', icon: 'edit' },
    { key: 'expand', text: 'Expand', value: 'expand', icon: 'expand', onClick: () => expandContainer(true) },
    { key: 'close', text: 'Close', value: 'close', icon: 'close' },
  ];

  const [dropdownValue, setDropdownValue] = React.useState('');

  return (
    <TableContainer>
      <Segment color="orange">
        <SegmentHeader>
          <SegmentName>Details</SegmentName>
          <Dropdown
            //onChange={this.handleChange}
            options={dropdownOptions}
            icon="ellipsis horizontal"
            value={dropdownValue}
            simple
            direction="left"
            item
          />
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
        </Segment>
      </Segment>
    </TableContainer>
  );
};

export default CostContainerDetail;
