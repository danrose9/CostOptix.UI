import React from 'react';
import { StyledMenu, StyledMenuExtra } from './__styles__/StyledSidebarItems';
import { Divider, SemanticICONS } from 'semantic-ui-react';
import MenuItems from './MenuItems';
import { ISidebarItem } from 'src/types/menu-types';

interface ISidebarProps {
  menuItems: ISidebarItem[];
  className?: string;
  showExtra?: boolean;
  showIcon?: boolean;
}

export const Sidebar: React.FC<ISidebarProps> = ({ menuItems, className, showExtra, showIcon }) => {
  const env = process.env.REACT_APP_ENV;

  return (
    <>
      <StyledMenu className={className}>
        {menuItems
          .filter((item) => (item.active && item.extra === false) || item.extra === undefined)
          .map((item, index) => {
            return <MenuItems items={item} showIcon={showIcon} key={index} className={className}></MenuItems>;
          })}
      </StyledMenu>
      {/* {env === 'production' ? null : (
        <StyledMenuExtra>
          <Divider clearing />
          {menuItems
            .filter((item) => item.dev === true)
            .map((item, index) => {
              return <MenuItems items={item} key={index}></MenuItems>;
            })}
        </StyledMenuExtra>
      )} */}
      {showExtra ? (
        <StyledMenuExtra>
          <Divider clearing />
          {menuItems
            .filter((item) => item.active && item.extra === true)
            .map((item, index) => {
              return <MenuItems items={item} showIcon={showIcon} key={index}></MenuItems>;
            })}
        </StyledMenuExtra>
      ) : null}
    </>
  );
};
