import * as React from 'react';
import styled from 'styled-components';
import { Segment, Dropdown, Table, SemanticWIDTHS, Icon, Tab } from 'semantic-ui-react';
import TinyLineChart from '../../components/charts/TinyLineChart';
import { TablePaging } from '../../components/tables/TablePaging';
import InformationButton from '../../components/buttons/InformationButton';

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

const AddNewContainerRow = styled(Table.Row)`
  cursor: pointer;
  color: #a9a9a9;
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
  containers?: {
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

  selectContainerDetail: (container: any) => void;
}

const AddNewContainer = () => {
  return (
    <AddNewContainerRow>
      <Table.Cell width="16">
        <Icon name="add" size="large" /> Add Container
      </Table.Cell>
      <Table.Cell />
      <Table.Cell />
      <Table.Cell />
      <Table.Cell />
    </AddNewContainerRow>
  );
};

const CostContainerTable: React.FunctionComponent<ICostContainerTableProps> = (props) => {
  const { containers, selectContainerDetail } = props;

  const rowDropdownOptions = [{ key: 1, text: 'Edit', value: 1, icon: 'edit' }];

  const dropdownOptions = [
    { key: 'add', text: 'Add', value: 'add', icon: 'add', disabled: false },
    {
      key: 'minimize',
      text: 'Minimize',
      value: 'minimize',
      icon: 'minus',
      onClick: () => console.log('minimize'),
      disabled: true,
    },
  ];

  var tooltipContent = 'Cost Containers are used to group resources for cost management purposes.';

  const [dropdownValue, setDropdownValue] = React.useState('');
  return (
    <>
      <TableContainer>
        <Segment color="blue">
          <SegmentHeader>
            <SegmentName>
              Containers <InformationButton content={tooltipContent} />
            </SegmentName>

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
              {containers && containers.length > 0
                ? containers.map((container, index) => (
                    <>
                      <Table.Row
                        style={{ cursor: 'pointer' }}
                        key={index}
                        onClick={() => selectContainerDetail(container)}
                      >
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
                        <Table.Cell style={{ padding: 0 }}>
                          <TinyLineChart data={container.data} width={150} height={30} dataKey="value" />
                        </Table.Cell>
                        <Table.Cell singleLine></Table.Cell>
                        <Table.Cell singleLine textAlign="right"></Table.Cell>
                      </Table.Row>
                    </>
                  ))
                : null}
              <AddNewContainer />
            </Table.Body>
          </Table>
          <TableFooter>
            <TablePaging totalPages={1} totalResults={1} pageSize={1}></TablePaging>
          </TableFooter>
        </Segment>
      </TableContainer>
    </>
  );
};

export default CostContainerTable;
