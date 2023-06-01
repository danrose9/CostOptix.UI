import * as React from 'react';
import styled from 'styled-components';
import { Segment, Dropdown, Table, SemanticWIDTHS } from 'semantic-ui-react';
import TinyLineChart from '../../components/charts/TinyLineChart';

export const TableContainer = styled.div`
  padding: 0.5em;
`;

export const TableHeader = styled.div`
  display: flex;
`;

export const TableFooter = styled.div``;

export const SegmentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SegmentName = styled.div`
  font-size: 1.5em;
`;

const table = {
  headers: [
    { name: 'Container', width: 5, align: 'left' },
    { name: '', width: 1, align: 'left' },
    { name: 'Cost Trend', width: 4, align: 'left' },
    { name: 'Providers', width: 4, align: 'left' },
    { name: 'Monthly Costs', width: 2, align: 'right' },
  ],
};

type textAlignType = 'center' | 'left' | 'right' | undefined;
type widthType = SemanticWIDTHS | undefined;

interface ICostContainerTableProps {
  selectContainerDetail: (container: any) => void;
  containers: {
    name: string;
    description: string;
    created: string;
    createdBy: string;
    owner: string;
    resourceCount: number;
    monthlyCosts: string;
    currency: string;
    providers: string[];
    data: any[];
  }[];
}

const CostContainerTable: React.FunctionComponent<ICostContainerTableProps> = (props) => {
  const { containers, selectContainerDetail } = props;

  const rowDropdownOptions = [{ key: 1, text: 'Edit', value: 1, icon: 'edit' }];

  const dropdownOptions = [
    { key: 1, text: 'Add', value: 1, icon: 'add' },
    { key: 2, text: 'Minimize', value: 2, icon: 'minus' },
  ];

  return (
    <>
      <TableContainer>
        <Segment color="blue">
          <SegmentHeader>
            <SegmentName>Containers</SegmentName>
            <Dropdown icon="ellipsis horizontal" simple item direction="left" open={false} options={dropdownOptions} />
          </SegmentHeader>
          <Table fixed striped>
            <Table.Header>
              <Table.Row>
                {table.headers.map((header, index) => {
                  return (
                    <Table.HeaderCell
                      key={index}
                      textAlign={header.align as textAlignType}
                      width={header.width as widthType}
                    >
                      {header.name}
                    </Table.HeaderCell>
                  );
                })}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {containers.map((container, index) => {
                return (
                  <Table.Row style={{ cursor: 'pointer' }} key={index} onClick={() => selectContainerDetail(container)}>
                    <Table.Cell singleLine>{container.name}</Table.Cell>
                    <Table.Cell>
                      <Dropdown
                        icon="ellipsis horizontal"
                        simple
                        item
                        direction="left"
                        open={false}
                        options={rowDropdownOptions}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <TinyLineChart data={container.data} width={150} height={50} dataKey="value" />
                    </Table.Cell>
                    <Table.Cell singleLine></Table.Cell>

                    <Table.Cell singleLine textAlign="right"></Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </Segment>
      </TableContainer>
    </>
  );
};

export default CostContainerTable;
