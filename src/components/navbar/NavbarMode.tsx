import React from 'react';
import { StyledSpan } from './__styles__/StyledNavbarItems';

interface INavbarModeProps {
  status: string;
}
export const NavbarMode: React.FC<INavbarModeProps> = (props) => {
  return (
    <StyledSpan data-testid="navbarItem-1">
      Signed in with <strong>{props.status}</strong> mode
    </StyledSpan>
  );
};
