import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Table, Header, Divider, Loader } from 'semantic-ui-react';
import { PageHeader } from '../../components/PageHeader';
import { ProviderImage } from '../../components/ProviderImage';
import { TablePaging } from '../../components/tables/TablePaging';
import { useSelector } from 'react-redux';
import { reduxState } from '../../services/redux/reduxState';
import SearchStandard from '../../components/SearchStandard';
import { PageContainer, PageHeaderContainer, TableContainer } from '../__styles__/DefaultPageStyles';
import { useNavigate } from 'react-router-dom';
import * as appRoutes from '../../app/appRoutes';
import { RESET_ISAVAILABLE } from '../../services/redux/reducers/resourceSlice';

const ResourceList = () => {
  const navigate = useNavigate();

  const [pageSize] = useState(20);
  const initialQuery = `?$top=${pageSize}&$skip=0`;
  const resources = useSelector((state) => state[reduxState.RESOURCES]);
  const dispatch = useDispatch();

  const RenderTable = () => {
    return (
      <>
        <Divider />
        <TableContainer>
          <Table fixed striped selectable color="purple">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={4}>Resource</Table.HeaderCell>
                <Table.HeaderCell width={4}>Service</Table.HeaderCell>
                <Table.HeaderCell width={6}>Billing Account</Table.HeaderCell>
                <Table.HeaderCell width={2}>Provider</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {resources.searchResults?.map((resource, index) => {
                return (
                  <Table.Row
                    style={{ cursor: 'pointer' }}
                    key={index}
                    onClick={() => {
                      dispatch(RESET_ISAVAILABLE(false));

                      navigate(appRoutes.RESOURCE_VIEW, {
                        state: { resource: resource },
                      });
                    }}
                  >
                    <Table.Cell singleLine>{resource.resourceName}</Table.Cell>
                    <Table.Cell singleLine>{resource.service}</Table.Cell>
                    <Table.Cell singleLine>{resource.accountName}</Table.Cell>
                    <Table.Cell>
                      <Header>
                        <ProviderImage provider={resource.provider} size="mini" />
                        <Header.Content>
                          <Header.Subheader>{resource.provider}</Header.Subheader>
                        </Header.Content>
                      </Header>
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
    <>
      <PageContainer>
        <PageHeaderContainer>
          <PageHeader title="Resources" />
          <SearchStandard initialQuery={initialQuery} pageSize={pageSize} isAvailable={resources.isAvailable} />
        </PageHeaderContainer>
        {resources.isLoading ? (
          <Loader size="large" active>
            Fetching Data..
          </Loader>
        ) : (
          <RenderTable />
        )}

        <Divider />
        <TablePaging
          searchValue={resources.searchValue}
          totalResults={resources.count}
          pageSize={pageSize}
          isLoading={resources.isLoading}
        />
      </PageContainer>
    </>
  );
};

export default ResourceList;
