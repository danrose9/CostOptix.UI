export interface IResource {
  id: string;
  billingAccountId: string;
  accountName: string;
  resourceId: string;
  resourceName: string;
  service: string;
  provider: string;
  location: string;
  currency: string;
  convertedCurrency: string;
  monthlySpend: IMonthlySpend[];
  amount30Day: number;
  amount30DayConverted: number;
  growth30Day: number;
  growth12Month: number;
}

export interface IMonthlySpend {
  amount: number;
  amountConverted: number;
  periodEnd: Date;
  periodStart: Date;
}
