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
  title?: string;
  path?: string;
  icon?: string;
  active?: boolean;
  lastUpdatedDate?: string;
  category?: string;
  tags?: string[];
  summary?: string;
}
