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

  interface ProviderProps {
    provider: ServiceConnectionProviderType;
  }
}
