import React from 'react';
import { Menu, Label } from 'semantic-ui-react';
import { ToggleButton } from './__styles__/StyledNavbarItems';
import { StyledNavbar } from '../../styles/AppStyles';
import NavbarItems from './NavbarItems';
import styled from 'styled-components';
import HomePageNavLogin from '../pages/homepage/HomePageNavLogin';
import { withDemo } from '../hoc/withDemo';

const BetaLabelColor = 'blue';

interface INavbarProps {
  onClick: () => void;
}

const BetaLabel = styled(Label)`
  font-size: 1.1em !important;
`;

const LoginButtonGroup = styled.div`
  display: flex;
  font-size: 0.7em;
`;

const Navbar: React.FC<INavbarProps> = ({ onClick }) => {
  const HomePageNavLoginWithDemo = withDemo(HomePageNavLogin);
  return (
    <>
      <StyledNavbar data-testid="navbar-1" size="large" className="ui ">
        <ToggleButton name="bars" size="large" onClick={onClick} />
        <Menu.Menu position="right">
          <LoginButtonGroup>
            <HomePageNavLoginWithDemo />
          </LoginButtonGroup>
          <Menu.Item>
            <BetaLabel color={BetaLabelColor}>Beta</BetaLabel>
          </Menu.Item>
          <NavbarItems />
        </Menu.Menu>
      </StyledNavbar>
    </>
  );
};

export default Navbar;
