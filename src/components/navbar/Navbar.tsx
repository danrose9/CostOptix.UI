import React from 'react';
import { Menu, Label } from 'semantic-ui-react';
import { ToggleButton } from './__styles__/StyledNavbarItems';
import { StyledNavbar } from '../../styles/AppStyles';
import NavbarItems from './NavbarItems';
import styled from 'styled-components';

interface INavbarProps {
  onClick: () => void;
}

const BetaLabel = styled(Label)`
  font-size: 1.1em !important;
`;

const Navbar: React.FC<INavbarProps> = ({ onClick }) => {
  return (
    <>
      <StyledNavbar data-testid="navbar-1" size="large" className="ui ">
        <ToggleButton name="bars" size="large" onClick={onClick} />

        <Menu.Menu position="right">
          <Menu.Item>
            <BetaLabel color="green">Beta</BetaLabel>
          </Menu.Item>
          <NavbarItems />
        </Menu.Menu>
      </StyledNavbar>
    </>
  );
};

export default Navbar;
