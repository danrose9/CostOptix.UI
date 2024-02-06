import React from 'react';
import { HomePageButton } from '../__styles__/HomePageStyles';
import { Image, Menu } from 'semantic-ui-react';
import * as images from '../../assets/index';
import { useNavigate } from 'react-router-dom';
import * as appRoutes from '../../app/router/appRoutes';
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

const ImageWrapper = styled.div`
  cursor: pointer;
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
            <ImageWrapper>
              <Image src={images.LOGOBLUE} size="medium" onClick={() => handleOnClick(appRoutes.ROOT)} />
            </ImageWrapper>
          </Menu.Item>
          <Menu.Menu position="right">
            {/* <MenuItem>
              <Dropdown simple text="Contact">
                <Dropdown.Menu>
                  <Dropdown.Item>English</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </MenuItem> */}
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
