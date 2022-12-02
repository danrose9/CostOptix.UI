import React from 'react';
import { menuItems } from './SidebarItems';
import {
  StyledMenu,
  StyledMenuExtra,
  StyledBrand,
} from './__styles__/StyledSidebarItems';
import { StyledSidebar } from '../../styles/AppContent';
import { ProductName } from '../ProductName';
import { OrganizationName } from '../OrganizationName';
import { Divider } from 'semantic-ui-react';
import MenuItems from './MenuItems';

export const Sidebar = (props) => {
  const env = process.env.REACT_APP_ENV;

  return (
    <StyledSidebar
      data-testid="sidebar-1"
      className="vertical"
      toggleSidebar={props.sidebarState}
    >
      <StyledBrand>
        <ProductName />
      </StyledBrand>
      <OrganizationName />
      <StyledMenu>
        {menuItems
          .filter((item) => item.active && item.extra === false)
          .map((item, index) => {
            return <MenuItems items={item} key={index}></MenuItems>;
          })}
      </StyledMenu>
      {env === 'production' ? null : (
        <StyledMenuExtra>
          <Divider clearing />
          {/* <StyledSectionHeader>Development Pages</StyledSectionHeader> */}
          {menuItems
            .filter((item) => item.dev === true)
            .map((item, index) => {
              return <MenuItems items={item} key={index}></MenuItems>;
            })}
        </StyledMenuExtra>
      )}
      <StyledMenuExtra>
        <Divider clearing />
        {menuItems
          .filter((item) => item.active && item.extra === true)
          .map((item, index) => {
            return <MenuItems items={item} key={index}></MenuItems>;
          })}
      </StyledMenuExtra>
    </StyledSidebar>
  );
};
