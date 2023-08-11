import React, { useState, FC } from 'react';
import styled from 'styled-components';
import { Segment, Table, SemanticWIDTHS, Icon, Menu, Dropdown } from 'semantic-ui-react';
import TinyLineChart from '../../components/charts/TinyLineChart';
import { TablePaging } from '../../components/tables/TablePaging';
import InformationButton from '../../components/buttons/InformationButton';
import CostContainerBuilder from './builder/CostContainerBuilder';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import '../../components/__styles__/fade.css';
import { InlineDropdown } from '../../components/menus';

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
  handleAddContainer: () => void;
}

const AddNewContainerRow = styled(Table.Row)`
  cursor: pointer;
  color: #a9a9a9;
`;

interface IAddNewContainerProps {
  handleAddContainer: (arg0: boolean) => void;
}

const AddNewContainer: FC<IAddNewContainerProps> = ({ handleAddContainer }) => {
  const [open, setOpen] = useState(false);
  return (
    <AddNewContainerRow onClick={handleAddContainer}>
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

const TableContents: FC<ICostContainerTableProps> = ({ containers, handleAddContainer }) => {
  const rowDropdownOptions = [{ key: 1, text: 'Edit', value: 1, icon: 'edit' }];

  return (
    <>
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
                <Table.Row style={{ cursor: 'pointer' }} key={index}>
                  <Table.Cell singleLine>{container.name}</Table.Cell>
                  <Table.Cell>
                    <InlineDropdown
                      icon="ellipsis horizontal"
                      item
                      direction="left"
                      open={false}
                      items={rowDropdownOptions}
                    />
                  </Table.Cell>
                  <Table.Cell style={{ padding: 0 }}>
                    <TinyLineChart data={container.data} width={150} height={30} dataKey="value" />
                  </Table.Cell>
                  <Table.Cell singleLine></Table.Cell>
                  <Table.Cell singleLine textAlign="right"></Table.Cell>
                </Table.Row>
              ))
            : null}
          <AddNewContainer handleAddContainer={handleAddContainer} />
        </Table.Body>
      </Table>
      <TableFooter>
        <TablePaging totalPages={1} totalResults={1} pageSize={1}></TablePaging>
      </TableFooter>
    </>
  );
};

const CostContainerTable: FC<ICostContainerTableProps> = ({ containers }) => {
  const [showAddContainer, setShowAddContainer] = useState(false);
  const [dropdownValue, setDropdownValue] = useState('');

  const handleAddContainer = () => {
    setShowAddContainer(true);
  };

  const containerListOptions = [
    { key: 'add', text: 'Add', value: 'add', icon: 'add', hidden: showAddContainer },
    { key: 'close', text: 'Close', value: 'close', icon: 'minus', hidden: !showAddContainer },
    { key: 'query', text: 'Show Query', value: 'query', icon: 'code', hidden: !showAddContainer },
  ];

  var tooltipContent = 'Cost Containers are used to group resources for cost management purposes.';

  const handleDropdownChange = (e: any, { value }: any) => {
    switch (value) {
      case 'add':
        setShowAddContainer(true);
        break;
      case 'close':
        setShowAddContainer(false);
        break;
      case 'query':
        break;
      default:
        break;
    }
  };

  return (
    <>
      <TableContainer>
        <Segment color="blue">
          <SegmentHeader>
            <SegmentName>
              Containers <InformationButton content={tooltipContent} />
            </SegmentName>
            <InlineDropdown
              onClick={handleDropdownChange}
              items={containerListOptions}
              value={dropdownValue}
              direction="left"
            />
          </SegmentHeader>
          <SwitchTransition>
            <CSSTransition
              key={showAddContainer ? 'CostContainerBuilder' : 'TableContents'}
              addEndListener={(node, done) => {
                node.addEventListener('transitionend', done, false);
              }}
              classNames="fade"
            >
              {!showAddContainer ? (
                <TableContents containers={containers} handleAddContainer={handleAddContainer} />
              ) : (
                <CostContainerBuilder />
              )}
            </CSSTransition>
          </SwitchTransition>
        </Segment>
      </TableContainer>
    </>
  );
};

export default CostContainerTable;
