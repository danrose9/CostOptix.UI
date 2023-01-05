import { SemanticFLOATS, SemanticSIZES } from 'semantic-ui-react';

export interface IMessageBox {
  title: string;
  message: string;
  color: undefined;
  size: undefined;
}

export interface IPageTitle {
  title: string;
}

export interface IProviderImage {
  provider: keyof typeof Image;
  image: string;
  size: SemanticSIZES;
  floated: SemanticFLOATS;
}

export interface IProvider {
  provider: keyof typeof Image;
}

export interface IServiceConnectionModal {
  disabled: boolean;
  title: string;
  name: string;
  vendor: string;
}

export interface IServiceConnectionCards {
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
}

export interface ICustomerServiceConnections {
  card: IServiceConnectionCards;
}

export interface ICustomerConnectedProviders {
  id: string;
  createdDate: string;
  accountId: string;
  accountName: string;
  connected: boolean;
  type: string;
}
