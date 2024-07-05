import React, { useState, useEffect, useRef } from 'react';
import SubMenuItems from './SubMenuItems';
import { StyledMenuItem, StyledSpan, SubMenuDropdown } from './__styles__/StyledSidebarItems';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

interface IMenuItemsProps {
  items: any;
  showIcon?: boolean;
  className?: string;
}

const MenuItems: React.FC<IMenuItemsProps> = ({ items, showIcon, className }) => {
  const [dropdown, setDropdown] = useState(false);
  let ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handler = (event: MouseEvent | TouchEvent) => {
      if (dropdown && ref.current && ref.current.contains(event.target as Node)) {
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
    <StyledMenuItem className={className}>
      {items.items ? (
        <>
          <button onClick={() => setDropdown((prev) => !prev)}>
            {showIcon ? <Icon className={items.icon}></Icon> : null}
            <StyledSpan className={className}>{items.title}</StyledSpan>
            <SubMenuDropdown name="angle down" />
          </button>
          <SubMenuItems submenuItems={items.items} dropdown={dropdown} className={className} />
        </>
      ) : (
        <>
          <Link to={items.path}>
            {showIcon ? <Icon className={items.icon}></Icon> : null}
            <StyledSpan id={items.id}>{items.title}</StyledSpan>
          </Link>
        </>
      )}
    </StyledMenuItem>
  );
};

export default MenuItems;
