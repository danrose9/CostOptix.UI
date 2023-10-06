import React from 'react';
import { Table } from 'semantic-ui-react';

const resourceData = [
  {
    title: 'Resource Name',
    value: 'resourceName',
  },
  {
    title: 'Resource Id',
    value: 'id',
  },
  {
    title: 'Service',
    value: 'service',
  },
  {
    title: 'Billing Account',
    value: 'accountName',
  },
  {
    title: 'Billing Account Id',
    value: 'billingAccountId',
  },
  {
    title: 'Provider',
    value: 'provider',
  },
  {
    title: 'Location',
    value: 'location',
  },
];

export const ResourceViewTable = ({ data }) => {
  return (
    <Table celled color="olive">
      <Table.Body>
        {resourceData.map((item, index) => {
          return (
            <Table.Row key={index}>
              <Table.Cell singleLine>{item.title}</Table.Cell>
              <Table.Cell>{data[item.value]}</Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};

export default ResourceViewTable;
