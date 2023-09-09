import { IMonthlySpend } from '../types/resource-types';
import { formatISODateToYYYYMMDD } from './dateFormatter';

export const orderAndFormatArray = (arr: IMonthlySpend[], key?: keyof IMonthlySpend): IMonthlySpend[] => {
  let sortedArray;

  if (key) {
    sortedArray = [...arr].sort((a, b) => (a[key] > b[key] ? 1 : -1));
  } else {
    sortedArray = [...arr].sort();
  }
  return sortedArray.map((item) => ({
    ...item,
    periodStart: formatISODateToYYYYMMDD(item.periodStart),
    periodEnd: formatISODateToYYYYMMDD(item.periodEnd),
  }));
};
