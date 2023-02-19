declare module 'billingaccount-types' {
  export type CustomerConnectedProvidersType = {
    accountId: string;
    accountName: string;
    createdDate: string;
    currency: string;
    id: string;
    isTransient: boolean;
    connected: boolean;
    provider: string;
    providerId: string;
    status: string;
  };

  interface AccountProps {
    account: CustomerConnectedProvidersType;
  }
}
