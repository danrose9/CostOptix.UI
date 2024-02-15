import React from 'react';
import { DropdownItem as SemanticDropdownItem } from 'semantic-ui-react';
import styled from 'styled-components';
import { COLORS } from '../../../app/constants';
import { useNavigate } from 'react-router-dom';
import * as appRoutes from '../../../app/router/appRoutes';

const StyledDropdownItem = styled(SemanticDropdownItem)`
  border: 1px solid ${COLORS.BUTTONS.BORDER} !important;
  background-color: ${COLORS.BUTTONS.PRIMARY};
`;

export const HomePageDropdownItems = () => {
  const navigate = useNavigate();
  const handleOnClick = (route: string) => {
    navigate(route);
  };

  return (
    <>
      <StyledDropdownItem onClick={() => handleOnClick(appRoutes.PRIVACY)}>Privacy</StyledDropdownItem>
      <StyledDropdownItem onClick={() => handleOnClick(appRoutes.TERMS)}>Terms of Service</StyledDropdownItem>
    </>
  );
};
