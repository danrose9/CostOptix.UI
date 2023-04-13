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
    children?: Element;
  }

  export type AzureFormDataType = {
    applicationId?: string;
    secretValue?: string;
    directoryId?: string;
  };

  export type AWSFormDataType = {
    applicationId?: string;
    secretValue?: string;
  };
}

declare module 'cloud-billingaccounts-types' {
  export type CloudProviderType = {
    count: number;
    providerAccountId: string;
    providerName: string;
    providerType: string;
    billingAccounts: CloudBillingAccountType[];
    error: string;
  };

  export type AddProviderType = {
    providerAccountId: string;
    providerName: string;
    cloudProvider: string;
    username: string;
    password: string;
    billingAccounts: AddBillingAccountType[];
  };

  type AddBillingAccountType = {
    billingAccountId: string;
    billingAccountName: string;
    currency: string;
  };

  export interface ICloudBillingAccountsArgs {
    directoryId: string;
    applicationId: string;
    secretValue: string;
    provider: string;
  }
}

declare module 'error-types' {
  export type ErrorType = {
    isError: boolean;
    errorMessage: string;
  };
}
