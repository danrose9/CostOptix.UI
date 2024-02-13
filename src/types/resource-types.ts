export interface IResource {
  id: string;
  billingAccountId: string;
  accountName: string;
  resourceId: string;
  resourceName: string;
  service: string;
  resourceTags: [];
  provider: string;
  location: string;
  currency: string;
  convertedCurrency: string;
  monthlySpend: IMonthlySpend[];
  amount30Day: number | null;
  amount30DayConverted: number | null;
  amount12Month: number | null;
  amount12MonthConverted: number;
  growth30Day: number | null;
  growth12Month: number | null;
  growth1CalendarMonth: number | null;
  growth12CalendarMonth: number | null;
}

export interface IMonthlySpend {
  amount: number;
  amountConverted: number;
  periodEnd: string;
  periodStart: string;
}
