import { IMonthlySpend } from './resource-types';

export interface IBillingAccount {
  id: string;
  providerId: string;
  accountName: string;
  createdDate: Date;
  accountId: string;
  currency: string;
  status: string;
  statusReason?: string;
  provider: string;
}

export interface IBillingAccountProps {
  billingAccount: IBillingAccount;
}

export interface IBillingAccountsCostDashboard {
  billingAccounts: IBillingAccountCostDashboard[];
}

export interface IBillingAccountCostDashboardProps {
  billingAccount: IBillingAccountCostDashboard;
}

export interface IBillingAccountCostDashboard extends IBillingAccount {
  convertedCurrency?: string;
  monthToDateCost?: number;
  monthToDateCostConverted?: number;
  monthlySpend?: IMonthlySpend[];
  mostExpensive?: [IBillingAccountMostExpensive];
  fastestGrowing?: [IBillingAccountFastestGrowing];
  isLoading: boolean;
  isError: boolean;
  status: string;
}

export interface IBillingAccountMostExpensive {
  id: string;
  resourceName: string;
  service: string;
  amount30Day: number;
  amount30DayConverted: number;
  accountName: string;
  billingAccountId: string;
  provider: string;
  currency: string;
  convertedCurrency: string;
}

export interface IBillingAccountFastestGrowing {
  id: string;
  resourceName: string;
  service: string;
  amountConverted: number;
  growth30Day: number;
  growth6Month: number;
}
