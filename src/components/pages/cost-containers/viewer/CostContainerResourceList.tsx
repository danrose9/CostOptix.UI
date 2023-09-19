import React from 'react';
import { IResource } from '../../../../types/resource-types';
import { Table, Header } from 'semantic-ui-react';
import { ProviderImage } from '../../../ProviderImage';
import TablePagination from '../../../tables/TablePagination';
import { useNavigate } from 'react-router-dom';
import * as appRoutes from '../../../../app/router/appRoutes';
import { RESET_ISAVAILABLE } from '../../../../services/redux/reducers/resourceSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../services/redux/store';

interface ICostContainerResourceListProps {
  resources: IResource[];
  count: number;
  handlePageChange: (e: any, data: any) => void;
}

export const CostContainerResourceList: React.FC<ICostContainerResourceListProps> = ({
  resources,
  count,
  handlePageChange,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <Table singleLine fixed>
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
          {resources.map((resource, index) => {
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
      <TablePagination totalItems={count} handlePageChange={handlePageChange} />
    </>
  );
};

export default CostContainerResourceList;
