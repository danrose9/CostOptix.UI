import React, { useState, FC } from 'react';
import styled from 'styled-components';
import { Segment, Table, Icon, Dropdown, Header } from 'semantic-ui-react';
import TinyLineChart from '../../components/charts/TinyLineChart';
import { TablePaging } from '../../components/tables/TablePaging';
import InformationButton from '../../components/buttons/InformationButton';
import { CostContainerBuilder, CostContainerViewer, CostContainerOptions } from './index';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import '../../components/__styles__/fade.css';
import { useDispatch } from 'react-redux';
import { formatISODateToUTCDate } from '../../utils/dateFormatter';
import { ICostContainer, ContainerAction } from '../../types/container-types';
import { INITIAL_CONTAINER_STATE } from '../../reducers/updateFilterReducer';
import { ProviderImage } from '../../components/ProviderImage';

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
  handleContainer?: (id: string | null, action: ContainerAction) => void;
}

const AddNewContainer: FC<IAddNewContainerProps> = ({ handleContainer }) => {
  return (
    <AddNewContainerRow
      onClick={() => handleContainer && handleContainer(null, ContainerAction.EDIT)}
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
  handleContainer: (id: string | null, action: ContainerAction) => void;
}

const StyledTable = styled(Table)`
  cursor: pointer;
`;

const TableContents: FC<ITableContentsProps> = ({ allCostContainers, handleContainer }) => {
  const { containers } = allCostContainers;

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
                if (container.createdDate) createdOn = formatISODateToUTCDate(container.createdDate);

                return (
                  <Table.Row key={index} onClick={() => handleContainer(container.id, ContainerAction.SHOW)}>
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
                          <CostContainerOptions container={container} handleContainer={handleContainer} />
                        </Dropdown.Menu>
                      </Dropdown>
                    </Table.Cell>
                    <Table.Cell singleLine>{createdOn}</Table.Cell>
                    <Table.Cell>
                      <TinyLineChart data={container.monthlySpend} width={150} height={30} dataKey="amountConverted" />
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
          <AddNewContainer handleContainer={handleContainer} />
        </Table.Body>
      </StyledTable>
      <TableFooter>
        <TablePaging totalPages={1} totalResults={1} pageSize={10} isLoading={true}></TablePaging>
      </TableFooter>
    </>
  );
};

const CostContainerTable: FC<ICostContainerTableProps> = ({ allCostContainers }) => {
  const { containers } = allCostContainers;
  /* CostContainerTable should be responsible for passing in either a new empty conainer or an exiting container. 
  The state should be held in the CostContainerBuilder */

  const [showContainerBuilder, setShowContainerBuilder] = useState(false);
  const [showContainerDetail, setShowContainerDetail] = useState(false);

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

  const handleContainer = (id: string | null, action: ContainerAction) => {
    const selectedContainer = getSelectedContainer(id);
    setSelectedContainer(selectedContainer);

    if (action === ContainerAction.SHOW) {
      setShowContainerDetail(true);
    } else if (action === ContainerAction.EDIT) {
      setShowContainerBuilder(true);
    }
  };

  const toggleContainerList = (value: boolean) => {
    setShowContainerBuilder(value);
  };

  const toggleContainerDetail = (value: boolean) => {
    setShowContainerDetail(value);
  };

  var tooltipContent = 'Cost Containers are used to group resources for cost management purposes.';

  let componentToRender;
  if (showContainerDetail && selectedContainer) {
    componentToRender = (
      <CostContainerViewer selectedContainer={selectedContainer} toggleContainerDetail={toggleContainerDetail} />
    );
  } else if (showContainerBuilder) {
    componentToRender = (
      <CostContainerBuilder toggleContainerList={toggleContainerList} selectedContainer={selectedContainer} />
    );
  } else {
    componentToRender = <TableContents allCostContainers={allCostContainers} handleContainer={handleContainer} />;
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
                showContainerDetail
                  ? 'ContainerDetail'
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
