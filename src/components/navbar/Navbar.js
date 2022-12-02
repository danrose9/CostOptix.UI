import React from 'react';
import { Menu } from 'semantic-ui-react';
import { ToggleButton } from './__styles__/StyledNavbarItems';
import { StyledNavbar } from '../../styles/AppContent';
import NavbarItems from './NavbarItems';
import { reduxState } from '../../services/redux/reduxState';
import { useSelector } from 'react-redux';
import { Login, LoginDemo } from '../auth/Login';
import { withNoAuth } from '../hoc/withAuth';

const LoginDemoWithAuth = withNoAuth(LoginDemo);
const LoginWithWithAuth = withNoAuth(Login);

const Navbar = ({ onClick }) => {
  const { isDemo } = useSelector((state) => state[reduxState.USER_PROFILE]);

  return (
    <>
      <StyledNavbar data-testid="navbar-1" size="large" className="ui ">
        <ToggleButton name="bars" size="large" onClick={onClick} />
        <Menu.Menu position="right">
          <Menu.Item>
            <LoginDemoWithAuth
              disabled={false}
              primary={false}
              content="Demo"
            />
            <LoginWithWithAuth
              disabled={false}
              primary={true}
              content="Login"
              isDemo={isDemo}
            />
          </Menu.Item>
          <NavbarItems />
        </Menu.Menu>
      </StyledNavbar>
    </>
  );
};

export default Navbar;
