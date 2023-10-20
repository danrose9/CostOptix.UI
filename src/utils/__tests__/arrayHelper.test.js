import { computeNewValue, combineSortSliceArray, upsert } from '../arrayHelper';

describe('computeNewValue', () => {
  test('returns correct value for two valid numbers', () => {
    const arrayItem = { provider: 5.2 };
    const newObj = { provider: 4.8 };
    expect(computeNewValue(arrayItem, newObj, 'provider')).toBe(10);
  });

  test('returns 0 for undefined values', () => {
    const arrayItem = {};
    const newObj = {};
    expect(computeNewValue(arrayItem, newObj, 'provider')).toBe(0);
  });

  test('returns correct value if one value is NaN', () => {
    const arrayItem = { provider: NaN };
    const newObj = { provider: 5 };
    expect(computeNewValue(arrayItem, newObj, 'provider')).toBe(5);
  });

  test('returns correct value if one value is null', () => {
    const arrayItem = { provider: null };
    const newObj = { provider: 5 };
    expect(computeNewValue(arrayItem, newObj, 'provider')).toBe(5);
  });

  test('returns correct value if one value is undefined', () => {
    const arrayItem = { provider: undefined };
    const newObj = { provider: 3.2 };
    expect(computeNewValue(arrayItem, newObj, 'provider')).toBe(3.2);
  });

  test('returns value to two decimal places', () => {
    const arrayItem = { provider: undefined };
    const newObj = { provider: 4.9000000000001 };
    expect(computeNewValue(arrayItem, newObj, 'provider')).toBe(4.9);
  });
});

describe('test combineSortSliceArray', () => {
  it('should combine, sort, and limit the array correctly', () => {
    const state = {
      data: [
        {
          id: '64ee6bb25e2601645f20dd52',
          resourceName: 'slt-demo-api',
          service: 'App Service',
          growth30Day: 1,
          growth6Month: 5,
          accountName: 'Dan Rose (Billing Profile)',
          billingAccountId: '92e98836-0235-4089-44b3-08dba8ab7254',
          provider: 'Azure',
          currency: 'GBP',
          convertedCurrency: 'USD',
        },
        {
          id: '64ee6bb25e2601645f20dd53',
          resourceName: 'slt-demo-functions20211014220828',
          service: 'Function App',
          growth30Day: 12,
          growth6Month: 22,
          accountName: 'Dan Rose Billing Profile)',
          billingAccountId: '92e98836-0235-4089-44b3-08dba8ab7254',
          provider: 'Azure',
          currency: 'GBP',
          convertedCurrency: 'USD',
        },
        {
          id: '64ee6bba5e2601645f20dd5c',
          resourceName: 'RoundingAdjustment',
          service: 'RoundingAdjustment',
          growth30Day: 0,
          growth6Month: 0,
          accountName: 'Dan Rose (Billing Profile)',
          billingAccountId: '92e98836-0235-4089-44b3-08dba8ab7254',
          provider: 'Azure',
          currency: 'GBP',
          convertedCurrency: 'USD',
        },
      ],
    };

    const payload = {
      accountName: 'Dan Rose (Billing Profile)',
      billingAccountId: '92e98836-0235-4089-44b3-08dba8ab7254',
      provider: 'AWS',
      currency: 'GBP',
      convertedCurrency: 'USD',
      fastestGrowing: [
        {
          growth6Month: 12,
          growth30Day: 34,
          id: '64f48d2f5e2601645f213306',
          resourceName: 'i-0ae678c58fced3905',
          service: 'ec2',
        },
      ],
    };
    const slice = 'fastestGrowing';
    const sortBy = 'growth30Day';
    const limit = 3;

    const result = combineSortSliceArray(state, payload, slice, sortBy, limit);

    const expected = [
      {
        accountName: 'Dan Rose (Billing Profile)',
        billingAccountId: undefined,
        convertedCurrency: 'USD',
        currency: 'GBP',
        growth6Month: 12,
        growth30Day: 34,
        id: '64f48d2f5e2601645f213306',
        provider: 'AWS',
        resourceName: 'i-0ae678c58fced3905',
        service: 'ec2',
      },
      {
        accountName: 'Dan Rose Billing Profile)',
        billingAccountId: '92e98836-0235-4089-44b3-08dba8ab7254',
        convertedCurrency: 'USD',
        currency: 'GBP',
        growth6Month: 22,
        growth30Day: 12,
        id: '64ee6bb25e2601645f20dd53',
        provider: 'Azure',
        resourceName: 'slt-demo-functions20211014220828',
        service: 'Function App',
      },
      {
        accountName: 'Dan Rose (Billing Profile)',
        billingAccountId: '92e98836-0235-4089-44b3-08dba8ab7254',
        convertedCurrency: 'USD',
        currency: 'GBP',
        growth6Month: 5,
        growth30Day: 1,
        id: '64ee6bb25e2601645f20dd52',
        provider: 'Azure',
        resourceName: 'slt-demo-api',
        service: 'App Service',
      },
    ];

    expect(result).toEqual(expected);
  });
});

describe('test upsert', () => {
  /// <summary>
  /// We do not need to test isCurrencyConflict = true as this will perform the same as isCurrencyConflict = false
  /// </summary>
  it('should combine, sort, and limit the array correctly', () => {
    var state = [];

    const payloads = [
      {
        provider: 'Azure',
        monthlySpend: [
          {
            periodStart: '2023-05-01T00:00:00Z',
            periodEnd: '2023-05-31T00:00:00Z',
            amount: 0.24,
            amountConverted: 0.24,
          },
          {
            periodStart: '2023-06-01T00:00:00Z',
            periodEnd: '2023-06-30T00:00:00Z',
            amount: 0.24,
            amountConverted: 0.24,
          },
          {
            periodStart: '2023-07-01T00:00:00Z',
            periodEnd: '2023-07-31T00:00:00Z',
            amount: 0.23,
            amountConverted: 0.23,
          },
          {
            periodStart: '2023-08-01T00:00:00Z',
            periodEnd: '2023-08-31T00:00:00Z',
            amount: 0.23,
            amountConverted: 0.23,
          },
        ],
      },
      {
        provider: 'Azure',
        monthlySpend: [
          {
            periodStart: '2023-05-01T00:00:00Z',
            periodEnd: '2023-05-31T00:00:00Z',
            amount: 4.01,
            amountConverted: 5.01,
          },
          {
            periodStart: '2023-06-01T00:00:00Z',
            periodEnd: '2023-06-30T00:00:00Z',
            amount: 3.91,
            amountConverted: 3.91,
          },
          {
            periodStart: '2023-07-01T00:00:00Z',
            periodEnd: '2023-07-31T00:00:00Z',
            amount: 3.95,
            amountConverted: 3.95,
          },
          { periodStart: '2023-08-01T00:00:00Z', periodEnd: '2023-08-31T00:00:00Z', amount: 3.6, amountConverted: 3.6 },
        ],
      },
      {
        provider: 'AWS',
        monthlySpend: [
          {
            periodStart: '2023-08-01T00:00:00Z',
            periodEnd: '2023-08-31T00:00:00Z',
            amount: 1.67,
            amountConverted: 1.67,
          },
          {
            periodStart: '2023-09-01T00:00:00Z',
            periodEnd: '2023-09-30T00:00:00Z',
            amount: 1.42,
            amountConverted: 1.42,
          },
        ],
      },
    ];

    payloads.forEach((payload) => {
      state = upsert(state, payload, false);
    });

    const expected = [
      { Azure: 4.25, name: 'May 2023' },
      { Azure: 4.15, name: 'Jun 2023' },
      { Azure: 4.18, name: 'Jul 2023' },
      { AWS: 1.67, Azure: 3.83, name: 'Aug 2023' },
      { AWS: 1.42, name: 'Sep 2023' },
    ];

    expect(state).toEqual(expected);
  });
});
