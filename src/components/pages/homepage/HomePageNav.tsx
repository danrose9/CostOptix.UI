import React from 'react';
import { HomePageButton } from '../../__styles__/HomePageStyles';
import { Image, Menu } from 'semantic-ui-react';
import * as images from '../../../assets/index';
import { useNavigate } from 'react-router-dom';
import * as appRoutes from '../../../app/router/appRoutes';
import styled from 'styled-components';
import { COLORS } from 'src/app/constants';
import { Dropdown } from 'src/components/menus/Dropdown';
import { HomePageDropdownItems } from './HomePageDropdownItems';
import ReactGA from 'react-ga4';
import { eventTypes } from 'src/hooks/useTrackEvent';
import { useMobileDevice } from 'src/hooks/useMobileDevice';

const Navbar = styled.div`
  height: 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;

  &.nav-border {
    border-bottom: 2px solid ${COLORS.SECONDARY};
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

  const handleButtonClick = (route: string, eventType: string) => {
    ReactGA.event(eventType);
    navigate(route);
  };

  const HomePageActionButtons = useMobileDevice(
    <Menu.Menu position="right">
      <HomePageButton
        className="transparent shift-right"
        onClick={() => handleButtonClick(appRoutes.HELP_CENTER, eventTypes.HELP_CENTER_BUTTON_CLICK)}
        role="button"
        data-testid="support-button"
      >
        Help Center
      </HomePageButton>
      <Dropdown dropdownName="Legal" children={<HomePageDropdownItems />} />
      <HomePageButton
        className="login"
        onClick={() => handleButtonClick(appRoutes.LOGIN, eventTypes.LOGIN_BUTTON)}
        role="button"
        data-testid="login-ext-button"
      >
        Login
      </HomePageButton>
      <HomePageButton
        className="get-started"
        onClick={() => handleButtonClick(appRoutes.SIGNUP, eventTypes.SIGNUP_BUTTON)}
        role="button"
        data-testid="get-started-button"
      >
        Get Started
      </HomePageButton>
    </Menu.Menu>,
    640,
    false
  );

  return (
    <>
      <Navbar>
        <Menu fluid secondary color="green">
          <Menu.Item>
            <ImageWrapper>
              <Image src={images.LOGOBLUE} size="medium" onClick={() => navigate(appRoutes.ROOT)} />
            </ImageWrapper>
          </Menu.Item>
          {HomePageActionButtons}
        </Menu>
      </Navbar>
    </>
  );
};

export default HomePageNav;
