export interface INewCostContainer {
  name: string;
  description: string;
  owner: string;
  query?: string;
}

export interface ICostContainer extends INewCostContainer {
  id: string;
  createdDate: string;
  createdBy: string;
  resourceCount: number;
  monthlySpend: any;
  currency: string;
  cloudProviders: string[];
  amount30Day: number;
  amount30DayConverted: number;
  data: {
    value: number;
  }[];
}
