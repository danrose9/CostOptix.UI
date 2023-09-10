import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../services/redux/store';
import { Table, Header, Divider } from 'semantic-ui-react';
import { Spinner } from '../../components/Loader';
import { PageHeader } from '../../components/PageHeader';
import { ProviderImage } from '../../components/ProviderImage';
import TablePagination from '../../components/tables/TablePagination';
import { useSelector } from 'react-redux';
import { reduxState } from '../../services/redux/reduxState';
import SearchResources from './SearchResources';
import { PageContainer, PageHeaderContainer, TableContainer } from '../__styles__/DefaultPageStyles';
import { useNavigate } from 'react-router-dom';
import * as appRoutes from '../../app/appRoutes';
import { RESET_ISAVAILABLE } from '../../services/redux/reducers/resourceSlice';
import { IRootState } from '../../services/redux/rootReducer';
import { IResource } from '../../types/resource-types';

interface ISearchResults {
  map: any;
}

interface IResourceTableProps {
  searchResults: ISearchResults;
}

const ResourcesTable: React.FC<IResourceTableProps> = ({ searchResults }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <Divider />
      <TableContainer>
        <Table fixed striped selectable color="purple">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={6}>Resource Name</Table.HeaderCell>
              <Table.HeaderCell width={6}>Service</Table.HeaderCell>
              <Table.HeaderCell width={2}>Provider</Table.HeaderCell>
              <Table.HeaderCell width={2} textAlign="right">
                Growth (30d)
              </Table.HeaderCell>
              <Table.HeaderCell width={2} textAlign="right">
                Amount (30d)
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {searchResults?.map((resource: IResource, index: React.Key | null | undefined) => {
              return (
                <Table.Row
                  style={{ cursor: 'pointer' }}
                  key={index}
                  onClick={() => {
                    dispatch<AppDispatch>(RESET_ISAVAILABLE(false));

                    navigate(appRoutes.RESOURCE_VIEW, {
                      state: { resource: resource },
                    });
                  }}
                >
                  <Table.Cell>{resource.resourceName}</Table.Cell>
                  <Table.Cell>{resource.service}</Table.Cell>
                  <Table.Cell>
                    <Header>
                      <ProviderImage provider={resource.provider} size="mini" />
                      <Header.Content>
                        <Header.Subheader>{resource.provider}</Header.Subheader>
                      </Header.Content>
                    </Header>
                  </Table.Cell>
                  <Table.Cell textAlign="right">{resource.growth30Day}%</Table.Cell>
                  <Table.Cell textAlign="right">{resource.amount30Day}</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </TableContainer>
    </>
  );
};

const ResourceList = () => {
  const pageSize = 10;
  const [skip, setSkip] = useState(0);
  const initialQuery = `?$top=${pageSize}&$skip=${skip}`;
  const resources = useSelector((state: IRootState) => state[reduxState.RESOURCES]);

  const handlePageChange = (e: any, data: any) => {
    setSkip((data.activePage - 1) * 10);
  };

  return (
    <>
      <PageContainer>
        <PageHeaderContainer>
          <PageHeader title="Resources" />
          <SearchResources initialQuery={initialQuery} pageSize={pageSize} isAvailable={resources.isAvailable} />
        </PageHeaderContainer>
        {resources.isLoading ? <Spinner /> : <ResourcesTable searchResults={resources.searchResults} />}

        <Divider />
        <TablePagination totalItems={resources.count} pageSize={pageSize} handlePageChange={handlePageChange} />
      </PageContainer>
    </>
  );
};

export default ResourceList;
