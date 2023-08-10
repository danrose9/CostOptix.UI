import React from 'react';
import { Dropdown as SemanticDropdown, Menu, Icon } from 'semantic-ui-react';
import styled from 'styled-components';

const StyledDropdown = styled(SemanticDropdown)`
  z-index: 1;
`;

export interface IStyledDropdownProps {
  icon?: string;
  item?: boolean;
  direction?: 'left' | 'right' | 'up' | 'down';
  open?: boolean;
  items: any[];
  onClick?: (event: React.SyntheticEvent<HTMLElement>, data: any) => void;
  value?: any;
  text?: string;
}

export const InlineDropdown: React.FC<IStyledDropdownProps> = (props) => {
  const { icon = 'ellipsis horizontal', items, direction, onClick } = props;

  return (
    <StyledDropdown icon={icon} items={items} direction={direction} simple>
      <StyledDropdown.Menu>
        {items.map((item, index) => (
          <StyledDropdown.Item text={item.text} key={index} icon={item.icon} value={item.value} onClick={onClick} />
        ))}
      </StyledDropdown.Menu>
    </StyledDropdown>
  );
};

export default InlineDropdown;
