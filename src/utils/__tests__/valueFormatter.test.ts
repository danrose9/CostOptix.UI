import { formatGrowthValue, formatCurrencyValue } from '../valueFormatter';

describe('formatGrowthValue', () => {
  it("should return '-' if value is null", () => {
    expect(formatGrowthValue(null)).toBe('-');
  });

  it("should return the value with a '%' sign", () => {
    expect(formatGrowthValue(10)).toBe('10%');
  });
});

describe('formatCurrencyValue', () => {
  it("should return '-' if value is null", () => {
    expect(formatCurrencyValue(null, '$')).toBe('-');
  });

  it('should return the value with the currency symbol', () => {
    expect(formatCurrencyValue(10, '$')).toBe('$10');
  });
});
