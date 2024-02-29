import React, { useContext } from 'react';
import { StyledSubMenu, StyledSpan, StyledMenuItem } from './__styles__/StyledSidebarItems';
import { Link } from 'react-router-dom';
import './__styles__/sidebar.css';
import { ISubmenuItem } from 'src/types/menu-types';
import { DocumentContext } from '../pages/help-center/DocumentContext';

interface ISubMenuItemsProps {
  submenuItems: ISubmenuItem[];
  dropdown: boolean;
  className?: string;
}

const SubMenuItems: React.FC<ISubMenuItemsProps> = ({ submenuItems, dropdown, className }) => {
  const { setDocumentId } = useContext(DocumentContext);

  const handleSelect = (id: string) => {
    setDocumentId(id);
  };

  return (
    <StyledSubMenu className={`dropdown dropdown-submenu ${dropdown ? 'show' : ''}`}>
      {submenuItems
        .filter((item) => item.active)
        .map((item, index) => (
          <StyledMenuItem key={index}>
            <Link to={item.path || ''}>
              <StyledSpan
                className={className}
                onClick={() => {
                  if (item.id !== undefined) {
                    handleSelect(item.id);
                  }
                }}
              >
                {item.title}
              </StyledSpan>
            </Link>
          </StyledMenuItem>
        ))}
    </StyledSubMenu>
  );
};

export default SubMenuItems;
