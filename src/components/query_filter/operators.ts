import { DropdownItemProps } from 'semantic-ui-react';

type DataType = 'string' | 'number' | 'boolean' | 'date' | 'datetime';

interface Field {
  key: number;
  text: string;
  value: string;
  datatype: DataType;
  options?: DropdownItemProps[];
}

const providerOptions = [
  { text: 'Azure', value: 'Azure' },
  { text: 'AWS', value: 'AWS' },
];

export const dataTypes: Record<DataType, string[]> = {
  string: ['eq', 'ne', 'contains', 'ncontains', 'beginWith', 'endWith'],
  number: ['eq', 'ne', 'gt', 'gte', 'lt', 'lte'],
  boolean: ['eq', 'ne'],
  date: ['eq', 'ne', 'gt', 'gte', 'lt', 'lte'],
  datetime: ['eq', 'ne', 'gt', 'gte', 'lt', 'lte'],
};

export const fields: Field[] = [
  // { key: 1, text: 'Organization', value: 'OrganizationId', datatype: 'string'},
  { key: 2, text: 'Billing Account', value: 'BillingAccountName', datatype: 'string' },
  { key: 3, text: 'Provider', value: 'CloudProvider', datatype: 'string', options: providerOptions },
  { key: 4, text: 'Resource Id', value: '_id', datatype: 'string' },
  { key: 5, text: 'Resource Name', value: 'ResourceName', datatype: 'string' },
  { key: 6, text: 'Azure Resource Group', value: 'AzureResourceGroup', datatype: 'string' },
  { key: 7, text: 'Service Name', value: 'Service', datatype: 'string' },
  { key: 8, text: 'Region', value: 'Region', datatype: 'string' },
  { key: 9, text: 'Azure Subscription Id', value: 'AzureSubscriptionId', datatype: 'string' },
  // { key: 10, text: 'Tags', value: 'ResourceTags', datatype: 'string' },
];

export const operators = [
  { key: 1, text: 'equal to', value: 'eq' },
  { key: 2, text: 'not equal to', value: 'ne' },
  { key: 3, text: 'greater than', value: 'gt' },
  { key: 4, text: 'greater than or equal', value: 'gte' },
  { key: 5, text: 'less than', value: 'lt' },
  { key: 6, text: 'less than or equal', value: 'lte' },
  // { key: 7, text: 'contains', value: 'contains' },
  // { key: 8, text: 'does not contain', value: 'ncontains' },
  // { key: 9, text: 'begins with', value: 'beginWith' },
  // { key: 10, text: 'ends with', value: 'endWith' },
];

export const conditionalOperators = [
  { key: 1, text: 'and', value: 'and' },
  { key: 2, text: 'or', value: 'or' },
];
