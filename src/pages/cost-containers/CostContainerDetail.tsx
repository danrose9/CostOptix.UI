import * as React from 'react';
import { Table, Button, Label, Dropdown, Segment, Header, Divider, Container } from 'semantic-ui-react';
import styled from 'styled-components';
import TinyLineChart from '../../components/charts/TinyLineChart';
import { TableContainer, SegmentHeader, SegmentName } from '../__styles__/DefaultPageStyles';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import StandardLineChart from '../../components/charts/StandardLineChart';
import { INewCostContainer } from '../../types/container-types';

export interface ICostContainerDetailProps {}

const config = {
  width: 150,
  height: 30,
};

interface CostContainerDetailProps {
  containerProps: INewCostContainer | null;
  toggleContainerDetail: (value: boolean) => void;
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

export const CostContainerDetail: React.FC<CostContainerDetailProps> = ({ containerProps, toggleContainerDetail }) => {
  const handleClose = (e: any) => {
    e.preventDefault();
    toggleContainerDetail(false);
  };
  // console.log('containerProps', containerProps);
  return (
    <TableContainer>
      <Segment color="orange">
        {containerProps ? (
          <Table basic="very">
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <Header as="h4">
                    <Header.Content>Owner</Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>{containerProps.id}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        ) : null}
        <Button color="teal" onClick={handleClose}>
          Close
        </Button>
      </Segment>
    </TableContainer>
  );
};

export default CostContainerDetail;
