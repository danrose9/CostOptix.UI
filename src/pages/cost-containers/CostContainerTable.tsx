import React, { useState, FC } from 'react';
import styled from 'styled-components';
import { Segment, Table, SemanticWIDTHS, Icon, Dropdown } from 'semantic-ui-react';
import TinyLineChart from '../../components/charts/TinyLineChart';
import { TablePaging } from '../../components/tables/TablePaging';
import InformationButton from '../../components/buttons/InformationButton';
import CostContainerBuilder from './builder/CostContainerBuilder';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import '../../components/__styles__/fade.css';
import { InlineDropdown } from '../../components/menus';
import CostContainerOptions from './CostContainerOptions';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../services/redux/store';
import { fetchCostContainers } from '../../services/redux/thunks/costContainerThunk';

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

export type ContainersType = {
  id: string;
  name: string;
  description: string;
  created: string;
  createdBy: string;
  owner: string;
  resourceCount: number;
  monthlyCosts: string;
  currency: string;
  providers: string[];
  data: {
    value: number;
  }[];
};

const AddNewContainerRow = styled(Table.Row)`
  cursor: pointer;
  color: #a9a9a9;
`;

interface IAddNewContainerProps {
  handleAddContainer?: (arg0: boolean) => void;
}

const AddNewContainer: FC<IAddNewContainerProps> = ({ handleAddContainer }) => {
  const [open, setOpen] = useState(false);
  return (
    <AddNewContainerRow onClick={handleAddContainer} data-testid="add-new-container-row">
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

interface ITableContentsProps {
  containers?: ContainersType[];
  handleAddContainer?: (arg0: boolean) => void;
}

const StyledTable = styled(Table)`
  overflow: unset !important;
`;

const TableContents: FC<ITableContentsProps> = ({ containers, handleAddContainer }) => {
  return (
    <>
      <StyledTable striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan="2">Container</Table.HeaderCell>
            <Table.HeaderCell>Cost Trend</Table.HeaderCell>
            <Table.HeaderCell>Providers</Table.HeaderCell>
            <Table.HeaderCell textAlign="right">Monthly Costs</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {containers && containers.length > 0
            ? containers.map((container, index) => (
                <Table.Row style={{ cursor: 'pointer', zIndex: '-1000' }} key={index}>
                  <Table.Cell singleLine>{container.name}</Table.Cell>
                  <Table.Cell>
                    <Dropdown
                      icon="ellipsis horizontal"
                      style={{ zIndex: 'auto' }}
                      simple
                      item
                      data-testid="cc-dropdown"
                      direction="left"
                      open={false}
                    >
                      <Dropdown.Menu>
                        <CostContainerOptions container={container} />
                      </Dropdown.Menu>
                    </Dropdown>
                  </Table.Cell>
                  <Table.Cell style={{ padding: 0 }}>
                    <TinyLineChart data={container.data} width={150} height={30} dataKey="value" />
                  </Table.Cell>
                  <Table.Cell singleLine>{container.providers}</Table.Cell>
                  <Table.Cell singleLine textAlign="right">
                    {container.monthlyCosts}
                  </Table.Cell>
                </Table.Row>
              ))
            : null}
          <AddNewContainer handleAddContainer={handleAddContainer} />
        </Table.Body>
      </StyledTable>
      <TableFooter>
        <TablePaging totalPages={1} totalResults={1} pageSize={1}></TablePaging>
      </TableFooter>
    </>
  );
};

interface ICostContainerTableProps {
  containers?: ContainersType[];
}

const CostContainerTable: FC<ICostContainerTableProps> = ({ containers }) => {
  const [showAddContainer, setShowAddContainer] = useState(false);
  const [dropdownValue, setDropdownValue] = useState('');
  const [showFilterOutput, setShowFilterOutput] = useState(false);
  const dispatch = useDispatch();

  const handleAddContainer = () => {
    setShowAddContainer(true);
  };

  const toggleContainerList = (value: boolean) => {
    setShowAddContainer(value);
    dispatch<AppDispatch>(fetchCostContainers());
  };

  const containerListOptions = [
    { key: 'add', text: 'Add', value: 'add', icon: 'add', hidden: showAddContainer },
    { key: 'close', text: 'Close', value: 'close', icon: 'minus', hidden: !showAddContainer },
    {
      key: 'query',
      text: showFilterOutput ? 'Hide Query' : 'Show Query',
      value: 'query',
      icon: 'code',
      hidden: !showAddContainer,
    },
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
        setShowFilterOutput(!showFilterOutput);
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
                <CostContainerBuilder showFilterOutput={showFilterOutput} toggleContainerList={toggleContainerList} />
              )}
            </CSSTransition>
          </SwitchTransition>
        </Segment>
      </TableContainer>
    </>
  );
};

export default CostContainerTable;
