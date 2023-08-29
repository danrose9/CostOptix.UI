export const fields = [
  // { key: 1, text: 'Organization', value: 'OrganizationId' },
  { key: 2, text: '(Billing Account)', value: 'BillingAccountName' },
  { key: 3, text: 'Provider', value: 'CloudProvider' },
  { key: 4, text: '(Resource Id)', value: '_id' },
  { key: 5, text: '(Resource Name)', value: 'name' },
  { key: 6, text: '(Azure Resource Group)', value: 'AzureMetadata.ResourceGroup' },
  { key: 7, text: '(Service Type)', value: 'AzureMetadata.ResourceType' },
  { key: 8, text: '(Region)', value: 'AzureMetadata.Region' },
  { key: 9, text: '(Azure Subscription Id)', value: 'AzureMetadata.AzureSubscriotnId' },
  { key: 10, text: '(Tags)', value: 'AzureMetadata.Tags' },
];

export const operators = [
  { key: 1, text: 'equal to', value: 'eq' },
  { key: 2, text: 'not equal to', value: 'ne' },
  { key: 3, text: 'greater than', value: 'gt' },
  { key: 4, text: 'greater than or equal', value: 'gte' },
  { key: 5, text: 'less than', value: 'lt' },
  { key: 6, text: 'less than or equal', value: 'lte' },
  // { key: 7, text: '(contains)', value: 'contains' },
  // { key: 8, text: '(does not contain)', value: 'ncontains' },
  // { key: 9, text: '(begins with)', value: 'beginWith' },
  // { key: 10, text: '(ends with)', value: 'endWith' },
];

export const conditionalOperators = [
  { key: 1, text: 'and', value: 'and' },
  { key: 2, text: 'or', value: 'or' },
];
