import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Table, Header, Divider, Loader } from 'semantic-ui-react';
import { PageHeader } from '../../components/PageHeader';
import { ProviderImage } from '../../components/ProviderImage';
import { TableFooter } from '../../components/TableFooter';
import { useSelector } from 'react-redux';
import { reduxState } from '../../services/redux/reduxState';
import SearchStandard from '../../components/SearchStandard';
import { PageContainer, StyledPageHeader, TableContainer } from '../__styles__/DefaultPageStyles';
import { useNavigate } from 'react-router-dom';
import * as appRoutes from '../../app/appRoutes';
import { RESET_ISAVAILABLE } from '../../services/redux/reducers/resourceSlice';
import ActionButton, { ActionButtons } from '../../components/buttons/ActionButton';
import PageLayout from '../PageLayout';

const costContainers = [
  { name: 'Software Project 1', count: 24, monthlyCosts: '$8,726.00' },
  { name: 'HR Files', count: 3, monthlyCosts: '$783.00' },
  { name: 'Backup for IT', count: 17, monthlyCosts: '$95,263.00' },
  { name: 'SQL DB for Finance', count: 5, monthlyCosts: '$23,543.00' },
];

const CostContainersList = () => {
  const RenderTable = () => {
    return (
      <>
        <Divider />
        <TableContainer>
          <Table fixed striped selectable color="purple">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={6}>Cost Container</Table.HeaderCell>
                <Table.HeaderCell width={4}>Number of Resources</Table.HeaderCell>
                <Table.HeaderCell width={4} textAlign="right">
                  Monthly Costs
                </Table.HeaderCell>
                <Table.HeaderCell width={2}></Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {costContainers.map((container, index) => {
                return (
                  <Table.Row style={{ cursor: 'pointer' }} key={index}>
                    <Table.Cell singleLine>{container.name}</Table.Cell>
                    <Table.Cell singleLine>{container.count}</Table.Cell>
                    <Table.Cell singleLine textAlign="right">
                      {container.monthlyCosts}
                    </Table.Cell>
                    <Table.Cell collapsing>
                      <ActionButtons>
                        <ActionButton name="edit outline" color="grey" content="edit" onClick={() => {}} />
                        <ActionButton name="trash alternate outline" color="grey" content="delete" onClick={() => {}} />
                      </ActionButtons>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </TableContainer>
      </>
    );
  };
  return (
    <PageLayout title="Cost Containers">
      <StyledPageHeader>
        {/* <SearchStandard
        // initialQuery={initialQuery}
        // pageSize={pageSize}
        // isAvailable={resources.isAvailable}
        /> */}
      </StyledPageHeader>
      <RenderTable />

      <Divider />
      <TableFooter
        // searchValue={resources.searchValue}
        totalResults={1}
        pageSize={1}
        // isLoading={resources.isLoading}
      />
    </PageLayout>
  );
};

export default CostContainersList;
