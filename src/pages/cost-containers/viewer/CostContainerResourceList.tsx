import React from 'react';
import { IResource } from '../../../types/resource-types';
import { Table } from 'semantic-ui-react';

interface ICostContainerResourceListProps {
  resources: IResource[];
}

export const CostContainerResourceList: React.FC<ICostContainerResourceListProps> = ({ resources }) => {
  return (
    <Table singleLine>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Resource Name</Table.HeaderCell>
          <Table.HeaderCell>Service</Table.HeaderCell>
          <Table.HeaderCell>Provider</Table.HeaderCell>
          <Table.HeaderCell>Growth</Table.HeaderCell>
          <Table.HeaderCell textAlign="right">Amount (30d)</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {resources.map((resource, index) => {
          return (
            <Table.Row key={index}>
              <Table.Cell>{resource.resourceName}</Table.Cell>
              <Table.Cell>{resource.service}</Table.Cell>
              <Table.Cell>{resource.provider}</Table.Cell>
              <Table.Cell>{resource.growth30Day}%</Table.Cell>
              <Table.Cell textAlign="right">{resource.amount30Day}</Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};

export default CostContainerResourceList;
