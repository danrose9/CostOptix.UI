import React, { useContext } from 'react';
import { HomePageButton } from '../../__styles__/ExternalPageStyles';
import { Image, Menu } from 'semantic-ui-react';
import * as images from '../../../assets/index';
import { useNavigate } from 'react-router-dom';
import * as appRoutes from '../../../app/router/appRoutes';
import styled from 'styled-components';
import { COLORS } from 'src/app/constants';
import { HomePageDropdown } from './HomePageDropdown';
import ReactGA from 'react-ga4';
import { eventTypes } from 'src/hooks/useTrackEvent';
import { useMobileDevice } from 'src/hooks/useMobileDevice';
import HomePageNavLogin from './HomePageNavLogin';
import { supportDropdownItems } from './supportDropdownItems';
import { DocumentContext } from '../../context/DocumentContext';

const PRICING_PAGE = 'Pricing';
const BLOGS = 'Blogs';

const Navbar = styled.div`
  height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  &.home-page {
    background-color: ${COLORS.BACKGROUND_IMAGE};
  }
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
  const { setDocumentId } = useContext(DocumentContext);

  const handleButtonClick = (route: string, eventType: string) => {
    setDocumentId('');
    ReactGA.event(eventType);
    navigate(route);
  };

  const HomePageActionButtons = useMobileDevice(
    <Menu.Menu position="right">
      <HomePageButton
        className="transparent"
        onClick={() => handleButtonClick(appRoutes.PRICING_PAGE, eventTypes.PRICING_PAGE_BUTTON_CLICK)}
        role="button"
        data-testid="support-button"
      >
        {PRICING_PAGE}
      </HomePageButton>
      <HomePageButton
        className="transparent shift-right"
        onClick={() => handleButtonClick(appRoutes.BLOGS, eventTypes.BLOGS_BUTTON_CLICK)}
        role="button"
      >
        {BLOGS}
      </HomePageButton>
      <HomePageDropdown title="Support" items={supportDropdownItems} />
      <HomePageNavLogin />
    </Menu.Menu>,
    640,
    false
  );

  return (
    <>
      <Navbar className={className}>
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
