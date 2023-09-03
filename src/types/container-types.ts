export interface INewCostContainer {
  id: string | null;
  name: string;
  description: string;
  owner: string;
  query?: any;
}

export interface ICostContainer extends INewCostContainer {
  createdDate: string;
  createdBy: string;
  resourceCount: number;
  currency: string;
  cloudProviders: string[];
  amount30Day: number;
  amount30DayConverted: number;
  monthlySpend: [];
}

export enum ContainerAction {
  SHOW,
  EDIT,
}
