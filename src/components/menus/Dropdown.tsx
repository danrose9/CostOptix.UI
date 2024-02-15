import React from 'react';
import { Dropdown as SemanticDropdown, DropdownMenu as SemanticDropdownMenu } from 'semantic-ui-react';
import styled from 'styled-components';
import { COLORS } from '../../app/constants';

const StyledDropdown = styled(SemanticDropdown)`
  font-size: 1.3em;
  font-weight: 400;
  font-family: 'Poppins', sans-serif;
  align-self: center;

  width: 8em !important;
  color: ${COLORS.BUTTONS.PRIMARY};
  text-align: center !important;
  & > .dropdown {
    padding: 0;
  }
`;

const StyledDropdownMenu = styled(SemanticDropdownMenu)`
  align-self: center !important;
`;

export interface IDropdownProps {
  dropdownName: string;
  children: React.ReactNode;
}

export function Dropdown(props: IDropdownProps) {
  return (
    <StyledDropdown text={props.dropdownName} simple data-testid="dropdown">
      <StyledDropdownMenu>{props.children}</StyledDropdownMenu>
    </StyledDropdown>
  );
}
