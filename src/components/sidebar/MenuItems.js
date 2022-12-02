import React, { useState, useEffect, useRef } from 'react';
import SubMenuItems from './SubMenuItems';
import {
  StyledMenuItem,
  StyledSpan,
  SubMenuDropdown,
} from './__styles__/StyledSidebarItems';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

const MenuItems = ({ items }) => {
  const [dropdown, setDropdown] = useState(false);

  let ref = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (dropdown && ref.current && !ref.current.contains(event.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [dropdown]);

  return (
    <StyledMenuItem className="menu-items" ref={ref}>
      {items.submenu ? (
        <>
          <button onClick={() => setDropdown((prev) => !prev)}>
            <Icon className={items.icon}></Icon>
            <StyledSpan>{items.title}</StyledSpan>
            <SubMenuDropdown name="angle down" />
          </button>
          <SubMenuItems submenuItems={items.submenu} dropdown={dropdown} />
        </>
      ) : (
        <>
          <Link to={items.path}>
            <Icon className={items.icon}></Icon>
            <StyledSpan>{items.title}</StyledSpan>
          </Link>
        </>
      )}
    </StyledMenuItem>
  );
};

export default MenuItems;
