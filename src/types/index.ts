import { ReactNode } from 'react';
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
  provider: string;
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

export interface IServiceConnectionCard {
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

export interface ICustomerServiceConnection {
  card: IServiceConnectionCard;
}

export interface ICustomerConnectedProviders {
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
}

export interface IChildren {
  children?: ReactNode;
}
