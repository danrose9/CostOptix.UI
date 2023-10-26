import React from 'react';
import { HomePageButton } from '../__styles__/HomePageStyles';
import { Image, Menu, Button } from 'semantic-ui-react';
import * as images from '../../assets/index';
import { useNavigate } from 'react-router-dom';
import * as appRoutes from '../../app/router/appRoutes';
import { BASE, DEMO_LOGIN } from '../../services/api/apiEndpoints';
import styled from 'styled-components';

const Navbar = styled.div`
  height: 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;

  &.nav-border {
    border-bottom: 2px solid #c2e2fa;
  }
`;

interface INavbarProps {
  className?: string;
}

export const HomePageNav: React.FC<INavbarProps> = ({ className }) => {
  const navigate = useNavigate();

  const handleOnClick = (route: string) => {
    navigate(route);
  };

  return (
    <>
      <Navbar className={className}>
        <Menu fluid secondary color="green">
          <Menu.Item>
            <div>
              <Image src={images.LOGOBLUE} size="medium" />
            </div>
          </Menu.Item>
          <Menu.Menu position="right">
            {/* <MenuItem name="Contact" />
              <MenuItem name="Pricing" />
              <MenuItem name="About Us" />
              <MenuItem name="Legal" /> */}
            <HomePageButton
              className="login"
              onClick={() => handleOnClick(appRoutes.LOGIN)}
              role="button"
              data-testid="login-ext-button"
            >
              Login
            </HomePageButton>
            <HomePageButton
              className="get-started"
              onClick={() => handleOnClick(appRoutes.SIGNUP)}
              role="button"
              data-testid="get-started-button"
            >
              Get Started
            </HomePageButton>
          </Menu.Menu>
        </Menu>
      </Navbar>
    </>
  );
};

export default HomePageNav;
