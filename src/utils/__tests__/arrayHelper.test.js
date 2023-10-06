import { computeNewValue } from '../arrayHelper';

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
