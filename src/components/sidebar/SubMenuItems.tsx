import React, { useContext } from 'react';
import { StyledSubMenu, StyledSpan, StyledMenuItem } from './__styles__/StyledSidebarItems';
import './__styles__/sidebar.css';
import { ISubmenuItem } from 'src/types/menu-types';
import { DocumentContext } from '../context/DocumentContext';

interface ISubMenuItemsProps {
  submenuItems: ISubmenuItem[];
  dropdown: boolean;
  className?: string;
}

const SubMenuItems: React.FC<ISubMenuItemsProps> = ({ submenuItems, dropdown, className }) => {
  const { setDocumentId, setCategory } = useContext(DocumentContext);

  // passing back the category and documentId to the parent component to set breadcrumb and render document
  const handleSelect = (webPath: string, category: string) => {
    setDocumentId(webPath);
    setCategory(category);
  };

  return (
    <StyledSubMenu className={`dropdown dropdown-submenu ${dropdown ? 'show' : ''}`}>
      {submenuItems
        .filter((item) => item.active)
        .map((item, index) => (
          <StyledMenuItem
            key={index}
            onClick={() => {
              if (item.webPath !== undefined) {
                if (item.webPath !== undefined && item.category !== undefined) {
                  handleSelect(item.webPath, item.category);
                }
              }
            }}
          >
            <button className="pad-right">
              <StyledSpan className={className}>{item.title}</StyledSpan>
            </button>
          </StyledMenuItem>
        ))}
    </StyledSubMenu>
  );
};

export default SubMenuItems;
