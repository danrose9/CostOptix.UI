import { SemanticFLOATS, SemanticSIZES } from "semantic-ui-react";

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