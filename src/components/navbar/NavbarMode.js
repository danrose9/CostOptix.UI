import React from 'react';
import { StyledSpan } from './__styles__/StyledNavbarItems';

export const NavbarMode = (props) => {
  return (
    <StyledSpan data-testid="navbarItem-1">
      Signed in with <strong>{props.status}</strong> mode
    </StyledSpan>
  );
};
