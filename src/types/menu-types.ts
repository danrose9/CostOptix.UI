import { SemanticICONS } from 'semantic-ui-react';

export interface ISidebarItem {
  title: string;
  id?: string;
  path?: string;
  icon?: string;
  active?: boolean;
  extra?: boolean;
  dev?: boolean;
  items?: ISubmenuItem[];
}

export interface ISubmenuItem {
  id?: string;
  webPath?: string;
  title?: string;
  path?: string;
  icon?: string;
  active?: boolean;
  lastUpdatedDate?: string;
  category?: string;
  tags?: string[];
  summary?: string;
}

export interface HomePageDropdownItem {
  index: number;
  className?: string;
  icon: string;
  title: string;
  content: string;
  navigate: string;
}
