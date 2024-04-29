import React from 'react';
import { HomePageButton } from '../../__styles__/HomePageStyles';
import { Image, Menu } from 'semantic-ui-react';
import * as images from '../../../assets/index';
import { useNavigate } from 'react-router-dom';
import * as appRoutes from '../../../app/router/appRoutes';
import styled from 'styled-components';
import { COLORS } from 'src/app/constants';
// import { HomePageDropdownItems } from './HomePageDropdownItems';
import { HomePageDropdown } from './HomePageDropdown';
import ReactGA from 'react-ga4';
import { eventTypes } from 'src/hooks/useTrackEvent';
import { useMobileDevice } from 'src/hooks/useMobileDevice';
import HomePageNavLogin from './HomePageNavLogin';
import { supportDropdownItems } from './supportDropdownItems';

const PRICING_PAGE = 'Pricing';

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
        onClick={() => handleButtonClick(appRoutes.PRICING_PAGE, eventTypes.PRICING_PAGE_BUTTON_CLICK)}
        role="button"
        data-testid="support-button"
      >
        {PRICING_PAGE}
      </HomePageButton>
      <HomePageDropdown title="Support" items={supportDropdownItems} />
      <HomePageNavLogin />
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
