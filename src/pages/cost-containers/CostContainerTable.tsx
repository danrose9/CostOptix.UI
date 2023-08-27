import React, { useState, FC } from 'react';
import styled from 'styled-components';
import { Segment, Table, Icon, Dropdown } from 'semantic-ui-react';
import TinyLineChart from '../../components/charts/TinyLineChart';
import { TablePaging } from '../../components/tables/TablePaging';
import InformationButton from '../../components/buttons/InformationButton';
import CostContainerBuilder from './builder/CostContainerBuilder';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import '../../components/__styles__/fade.css';
import CostContainerOptions from './CostContainerOptions';
import { useDispatch } from 'react-redux';
import { formatISODateToUTCDate } from '../../utils/dateFormatter';
import { ICostContainer, INewCostContainer } from '../../types/container-types';
import { INITIAL_CONTAINER_STATE } from '../../reducers/updateFilterReducer';

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

interface IAddNewContainerProps {
  handleEditContainer?: (id: string | null) => void;
}

const AddNewContainer: FC<IAddNewContainerProps> = ({ handleEditContainer }) => {
  return (
    <AddNewContainerRow
      onClick={() => handleEditContainer && handleEditContainer(null)}
      data-testid="add-new-container-row"
    >
      <Table.Cell>
        <Icon name="add" size="large" /> Add Container
      </Table.Cell>
      <Table.Cell />
      <Table.Cell />
      <Table.Cell />
      <Table.Cell />
      <Table.Cell />
    </AddNewContainerRow>
  );
};

interface ITableContentsProps {
  containers?: ICostContainer[];
  handleEditContainer: (id: string | null) => void;
}

const StyledTable = styled(Table)`
  cursor: pointer;
`;

const TableContents: FC<ITableContentsProps> = ({ containers, handleEditContainer }) => {
  return (
    <>
      <StyledTable striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={5}>Container</Table.HeaderCell>
            <Table.HeaderCell width={1}></Table.HeaderCell>
            <Table.HeaderCell width={3}>Created on</Table.HeaderCell>
            <Table.HeaderCell width={3}>Cost Trend</Table.HeaderCell>
            <Table.HeaderCell width={2}>Providers</Table.HeaderCell>
            <Table.HeaderCell textAlign="right" width={2}>
              Monthly Costs
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {containers && containers.length > 0
            ? containers.map((container, index) => (
                <Table.Row key={index}>
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
                        <CostContainerOptions container={container} handleEditContainer={handleEditContainer} />
                      </Dropdown.Menu>
                    </Dropdown>
                  </Table.Cell>
                  <Table.Cell singleLine>{formatISODateToUTCDate(container.createdDate)}</Table.Cell>
                  <Table.Cell>
                    <TinyLineChart data={container.data} width={150} height={30} dataKey="value" />
                  </Table.Cell>
                  <Table.Cell singleLine>{container.cloudProviders}</Table.Cell>
                  <Table.Cell singleLine textAlign="right">
                    ${container.amount30Day}
                  </Table.Cell>
                </Table.Row>
              ))
            : null}
          <AddNewContainer handleEditContainer={handleEditContainer} />
        </Table.Body>
      </StyledTable>
      <TableFooter>
        <TablePaging totalPages={1} totalResults={1} pageSize={10} isLoading={true}></TablePaging>
      </TableFooter>
    </>
  );
};

interface ICostContainerTableProps {
  containers?: ICostContainer[];
}

const CostContainerTable: FC<ICostContainerTableProps> = ({ containers }) => {
  /* CostContainerTable should be responsible for passing in either a new empty conainer or an exiting container. 
  The state should be held in the CostContainerBuilder */

  const [showContainerBuilder, setShowContainerBuilder] = useState(false);
  const [containerProps, setContainerProps] = useState<INewCostContainer | null>(null);
  const dispatch = useDispatch();

  const getContainerProps = (id: string | null): INewCostContainer => {
    // If id is null, return INITIAL_CONTAINER_STATE
    if (!id) {
      return INITIAL_CONTAINER_STATE;
    }

    // Find the container by its id in containers
    const container = containers && containers.find((container) => container.id === id);

    // If container not found, return INITIAL_CONTAINER_STATE
    if (!container) {
      return INITIAL_CONTAINER_STATE;
    }

    // Destructure the desired properties and return them
    const { name, description, owner, query } = container;
    return { id, name, description, owner, query };
  };

  const handleEditContainer = (id: string | null) => {
    /* if container has an id then we are editing an existing container,
     if container is null then we are creating a new container */

    const containerProps = getContainerProps(id);

    /* pass container props to CostContainerBuilder and toggle showContainerBuilder to true */
    setContainerProps(containerProps);
    setShowContainerBuilder(true);
  };

  const toggleContainerList = (value: boolean) => {
    setShowContainerBuilder(value);
  };

  var tooltipContent = 'Cost Containers are used to group resources for cost management purposes.';

  return (
    <>
      <TableContainer>
        <Segment color="blue">
          <SegmentHeader>
            <SegmentName>
              Containers <InformationButton content={tooltipContent} />
            </SegmentName>
          </SegmentHeader>
          <SwitchTransition>
            <CSSTransition
              key={showContainerBuilder ? 'CostContainerBuilder' : 'TableContents'}
              addEndListener={(node, done) => {
                node.addEventListener('transitionend', done, false);
              }}
              classNames="fade"
            >
              {!showContainerBuilder ? (
                <TableContents containers={containers} handleEditContainer={handleEditContainer} />
              ) : (
                <CostContainerBuilder toggleContainerList={toggleContainerList} containerProps={containerProps} />
              )}
            </CSSTransition>
          </SwitchTransition>
        </Segment>
      </TableContainer>
    </>
  );
};

export default CostContainerTable;
