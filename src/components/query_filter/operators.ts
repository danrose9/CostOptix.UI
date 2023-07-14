export const fields = [
  { key: 1, text: 'Organization', value: 'OrganizationId' },
  { key: 2, text: 'Billing Account', value: 'BillingAccountId' },
  { key: 3, text: 'Provider', value: 'CloudProvider' },
  { key: 4, text: 'Resource Id', value: '_id' },
  { key: 5, text: 'Resource Name', value: 'name' },
];

export const operators = [
  { key: 1, text: 'is equal to', value: 'eq' },
  { key: 2, text: 'is not equal to', value: 'ne' },
  { key: 3, text: 'is greater than', value: 'gt' },
  { key: 4, text: 'is greater than or equal to', value: 'gte' },
  { key: 5, text: 'is less than', value: 'lt' },
  { key: 6, text: 'is less than or equal to', value: 'lte' },
  { key: 7, text: 'contains', value: 'contains' },
  { key: 8, text: 'does not contain', value: 'ncontains' },
  { key: 9, text: 'begins with', value: 'beginWith' },
  { key: 10, text: 'ends with', value: 'endWith' },
];

export const conditionalOperators = [
  { key: 1, text: 'and', value: 'and' },
  { key: 2, text: 'or', value: 'or' },
];
