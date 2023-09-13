import React, { useState, FC, useEffect } from 'react';
import styled from 'styled-components';
import { Segment, Table, Icon, Dropdown, Header } from 'semantic-ui-react';
import TinyLineChart from '../../charts/TinyLineChart';
import TablePagination from '../../tables/TablePagination';
import InformationButton from '../../buttons/InformationButton';
import { CostContainerBuilder, CostContainerViewer, CostContainerOptions } from './index';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import '../../__styles__/fade.css';
import { useDispatch } from 'react-redux';
import { formatISODateToUTCDate } from '../../../utils/dateFormatter';
import { ICostContainer, ContainerAction } from '../../../types/container-types';
import { INITIAL_CONTAINER_STATE } from '../../../reducers/updateFilterReducer';
import { ProviderImage } from '../../ProviderImage';
import { AppDispatch } from '../../../services/redux/store';
import { fetchCostContainers } from '../../../services/redux/thunks/costContainerThunk';
import { orderAndFormatArray } from '../../../utils/arrayFormatter';

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
  line-height: 2.5em;
`;

interface IAddNewContainerProps {
  handleContainerAction?: (id: string | null, action: ContainerAction) => void;
}

const AddNewContainer: FC<IAddNewContainerProps> = ({ handleContainerAction }) => {
  return (
    <AddNewContainerRow
      onClick={() => handleContainerAction && handleContainerAction(null, ContainerAction.EDIT)}
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

interface ICostContainerThunkResponse {
  containers: ICostContainer[];
  isLoading: boolean;
  error: string | null;
}

interface ICostContainerTableProps {
  allCostContainers: ICostContainerThunkResponse;
}

interface ITableContentsProps {
  allCostContainers: ICostContainerThunkResponse;
  handleContainerAction: (id: string | null, action: ContainerAction) => void;
}

const StyledTable = styled(Table)`
  cursor: pointer;
`;

const TableContents: FC<ITableContentsProps> = ({ allCostContainers, handleContainerAction }) => {
  const { containers } = allCostContainers;

  const handlePageChange = (e: any, data: any) => {};
  return (
    <>
      <StyledTable striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={5}>Container</Table.HeaderCell>
            <Table.HeaderCell width={1}></Table.HeaderCell>
            <Table.HeaderCell width={3}>Created on</Table.HeaderCell>
            <Table.HeaderCell width={3} style={{ paddingLeft: '3.5em' }}>
              Cost Trend
            </Table.HeaderCell>
            <Table.HeaderCell width={2}>Providers</Table.HeaderCell>
            <Table.HeaderCell textAlign="right" width={2}>
              Last 30 days
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {containers && containers.length > 0
            ? containers.map((container, index) => {
                var createdOn = null;
                var orderData = null;

                if (container.monthlySpend) orderData = orderAndFormatArray(container.monthlySpend || [], 'periodEnd');
                if (container.createdDate) createdOn = formatISODateToUTCDate(container.createdDate);
                return (
                  <Table.Row key={index} onClick={() => handleContainerAction(container.id, ContainerAction.SHOW)}>
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
                          <CostContainerOptions container={container} handleContainerAction={handleContainerAction} />
                        </Dropdown.Menu>
                      </Dropdown>
                    </Table.Cell>
                    <Table.Cell singleLine>{createdOn}</Table.Cell>
                    <Table.Cell>
                      <TinyLineChart data={orderData} width={150} height={30} dataKey="amountConverted" />
                    </Table.Cell>
                    <Table.Cell singleLine style={{ display: 'flex', alignItems: 'center' }}>
                      {container.cloudProviders
                        ? container.cloudProviders.map((provider, index) => (
                            <Header key={index} style={{ margin: 0 }}>
                              <ProviderImage provider={provider} size="small" />
                            </Header>
                          ))
                        : null}
                    </Table.Cell>
                    <Table.Cell singleLine textAlign="right">
                      ${container.amount30Day}
                    </Table.Cell>
                  </Table.Row>
                );
              })
            : null}
          <AddNewContainer handleContainerAction={handleContainerAction} />
        </Table.Body>
      </StyledTable>
      <TableFooter>
        <TablePagination
          totalItems={1}
          handlePageChange={handlePageChange}
          pageSize={10}
          isLoading={true}
        ></TablePagination>
      </TableFooter>
    </>
  );
};

const CostContainerTable: FC<ICostContainerTableProps> = ({ allCostContainers }) => {
  const { containers } = allCostContainers;
  /* CostContainerTable should be responsible for passing in either a new empty conainer or an exiting container. 
  The state should be held in the CostContainerBuilder */

  const [showContainerBuilder, setShowContainerBuilder] = useState(false);
  const [showContainerViewer, setShowContainerViewer] = useState(false);

  const [selectedContainer, setSelectedContainer] = useState<ICostContainer | null>(null);
  const dispatch = useDispatch();

  const getSelectedContainer = (id: string | null): ICostContainer => {
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

    return container;
  };

  const handleContainerAction = (id: string | null, action: ContainerAction) => {
    const selectedContainer = getSelectedContainer(id);
    setSelectedContainer(selectedContainer);

    switch (action) {
      case ContainerAction.SHOW:
        setShowContainerViewer(true);
        break;
      case ContainerAction.EDIT:
        setShowContainerViewer(false);
        setShowContainerBuilder(true);
        break;
      case ContainerAction.CLOSE:
        setShowContainerViewer(false);
        setShowContainerBuilder(false);
        dispatch<AppDispatch>(fetchCostContainers());
        break;
      default:
        break;
    }
  };

  var tooltipContent = 'Cost Containers are used to group resources for cost management purposes.';

  let componentToRender;
  if (showContainerViewer && selectedContainer) {
    componentToRender = (
      <CostContainerViewer selectedContainer={selectedContainer} handleContainerAction={handleContainerAction} />
    );
  } else if (showContainerBuilder) {
    componentToRender = (
      <CostContainerBuilder selectedContainer={selectedContainer} handleContainerAction={handleContainerAction} />
    );
  } else {
    componentToRender = (
      <TableContents allCostContainers={allCostContainers} handleContainerAction={handleContainerAction} />
    );
  }

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
              key={
                showContainerViewer
                  ? 'ContainerViewer'
                  : showContainerBuilder
                  ? 'CostContainerBuilder'
                  : 'TableContents'
              }
              addEndListener={(node, done) => {
                node.addEventListener('transitionend', done, false);
              }}
              classNames="fade"
            >
              {componentToRender}
            </CSSTransition>
          </SwitchTransition>
        </Segment>
      </TableContainer>
    </>
  );
};

export default CostContainerTable;
