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

  interface IAccountProps {
    account: CustomerConnectedProvidersType;
  }
}

declare module 'provider-types' {
  export type ServiceConnectionProviderType = {
    vendor: string;
    provider: string;
    name: string;
    connectionName: string;
    img: any;
    href: string;
    consentUrl: string;
    description: string;
    details: string;
    active: boolean;
    colorHex: string;
    color: string;
  };

  interface IProviderProps {
    cloudProvider: ServiceConnectionProviderType;
  }
}

declare module 'cloud-billingaccounts-types' {
  export type CloudProviderType = {
    providerAccountId: string;
    providerName: string;
    providerType: string;
    billingAccounts: CloudBillingAccountType[];
  };

  export type AddBillingAccountType = {
    providerAccountId: string;
    providerName: string;
    cloudProvider: string;
    username: string;
    password: string;
    billingAccounts: CloudBillingAccountType[];
  };

  type CloudBillingAccountType = {
    billingAccountId: string;
    billingAccountName: string;
    currency: string;
  };
}

declare module 'error-types' {
  export type ErrorType = {
    isError: boolean;
    errorMessage: string;
  };
}
