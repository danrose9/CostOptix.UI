import React from 'react';
import { Table } from 'semantic-ui-react';
import { IResource } from 'src/types/resource-types';

interface ResourceDataItem {
  title: string;
  value: keyof IResource;
}

const resourceData: ResourceDataItem[] = [
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

interface ResourceProfileProps {
  data: IResource;
}

export const ResourceProfile: React.FC<ResourceProfileProps> = ({ data }) => {
  return (
    <Table celled color="olive">
      <Table.Body>
        {resourceData.map((item, index) => {
          return (
            <Table.Row key={index}>
              <Table.Cell singleLine>{item.title}</Table.Cell>
              <Table.Cell>{String(data[item.value])}</Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};

export default ResourceProfile;
