import React from 'react';
import { IResource } from '../../../types/resource-types';
import { Table, Header } from 'semantic-ui-react';
import { ProviderImage } from '../../../components/ProviderImage';
import TablePagination from '../../../components/tables/TablePagination';

interface ICostContainerResourceListProps {
  resources: IResource[];
  count: number;
}

export const CostContainerResourceList: React.FC<ICostContainerResourceListProps> = ({ resources, count }) => {
  const handlePaginationChange = (e: any, data: any) => {
    console.log('Active page is: ', data.activePage);
  };

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
              <Table.Row key={index}>
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
      <TablePagination totalItems={count} handlePaginationChange={handlePaginationChange} />
    </>
  );
};

export default CostContainerResourceList;
