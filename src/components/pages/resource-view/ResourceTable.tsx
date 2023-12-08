import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Divider, Header, Table } from 'semantic-ui-react';
import { ProviderImage } from '../../ProviderImage';
import { StyledTableRow } from '../../tables/DefaultTableStyles';
import { TableContainer } from '../../__styles__/DefaultPageStyles';
import { IResource } from '../../../types/resource-types';
import { AppDispatch } from '../../../services/redux/store';
import { RESET_ISAVAILABLE } from '../../../services/redux/reducers/resourceSlice';
import * as appRoutes from '../../../app/router/appRoutes';

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
                  as={StyledTableRow}
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

export default ResourcesTable;
