import React from 'react';
import { Sidebar } from './Sidebar';
import { StyledSidebar } from 'src/styles/AppStyles';
import { ProductName } from '../ProductName';
import { OrganizationName } from '../OrganizationName';
import { StyledBrand } from './__styles__/StyledSidebarItems';
import { appSidebarItems } from './appSidebarItems';

interface IAppSidebarProps {
  sidebarState: boolean;
}

const AppSidebar: React.FunctionComponent<IAppSidebarProps> = (props) => {
  return (
    <StyledSidebar data-testid="sidebar-1" className="vertical" toggleSidebar={props.sidebarState}>
      <StyledBrand>
        <ProductName />
      </StyledBrand>
      <OrganizationName />
      <Sidebar menuItems={appSidebarItems} showExtra={true} showIcon={true} />
    </StyledSidebar>
  );
};

export default AppSidebar;
