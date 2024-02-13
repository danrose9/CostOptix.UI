/* Incomplete component */

import React from 'react';
import {
  Dropdown as SemanticDropdown,
  DropdownMenu as SemanticDropdownMenu,
  DropdownItem as SemanticDropdownItem,
} from 'semantic-ui-react';
import styled from 'styled-components';
import { COLORS } from '../../app/constants';

const StyledDropdown = styled(SemanticDropdown)`
  font-size: 1.3em;
  font-weight: 400;
  font-family: 'Poppins', sans-serif;
  align-self: center;
  // padding: 0 2em;
  width: 5em !important;
  color: ${COLORS.BUTTONS.PRIMARY};
`;

const StyledDropdownItem = styled(SemanticDropdownItem)`
  border: 1px solid ${COLORS.BUTTONS.PRIMARY} !important;
`;

const StyledDropdownMenu = styled(SemanticDropdownMenu)`
  // margin: 2em !important;
  align-self: center !important;
`;

const DropdownItem = () => {
  return (
    <>
      <StyledDropdownItem>Contact Us</StyledDropdownItem>
    </>
  );
};

export interface IDropdownProps {
  dropdownName: string;
}

export function Dropdown(props: IDropdownProps) {
  return (
    <StyledDropdown text={props.dropdownName} floating icon>
      <StyledDropdownMenu>
        <DropdownItem />
      </StyledDropdownMenu>
    </StyledDropdown>
  );
}
