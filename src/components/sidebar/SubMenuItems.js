import React from 'react';
import {
  StyledSubMenu,
  StyledSpan,
  StyledMenuItem,
} from './__styles__/StyledSidebarItems';
import { Link } from 'react-router-dom';
import './__styles__/sidebar.css';

const SubMenuItems = ({ submenuItems, dropdown }) => {
  return (
    <StyledSubMenu
      className={`dropdown dropdown-submenu ${dropdown ? 'show' : ''}`}
    >
      {submenuItems
        .filter((item) => item.active)
        .map((item, index) => (
          <StyledMenuItem key={index}>
            <Link to={item.path}>
              <StyledSpan>{item.title}</StyledSpan>
            </Link>
          </StyledMenuItem>
        ))}
    </StyledSubMenu>
  );
};

export default SubMenuItems;
