export function formatGrowthValue(value: number | null): string {
  return value === null ? '-' : `${value}%`;
}

export function formatCurrencyValue(value: number | null, currency: string | undefined): string {
  return value === null ? '-' : `${currency}${value}`;
}
