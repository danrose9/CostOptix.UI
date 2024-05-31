import React from 'react';
import {
  StyledHeader,
  StyledSubHeader,
  HomePageMainLeft,
  HomePageTitle,
  HomePageSubTitle,
  HomePageActions,
  HomePageButton,
  HomePageWrapper,
} from '../../__styles__/ExternalPageStyles';
import { BASE, DEMO_LOGIN } from '../../../services/api/apiEndpoints';
import { AppDispatch } from 'src/services/redux/store';
import { useDispatch } from 'react-redux';
import { setIsDemo } from '../../../services/redux/reducers/userProfileSlice';
import CookieBanner from '../../CookieBanner';
import ReactGA from 'react-ga4';
import { eventTypes } from '../../../hooks/useTrackEvent';
import MessageBox from '../../MessageBox';
import { useMobileDevice } from 'src/hooks/useMobileDevice';
import { Container } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import * as appRoutes from '../../../app/router/appRoutes';

const content = {
  TITLE: 'Reduce Your Cloud Spending Costs Effectively with CostOptix',
  SUBTITLE:
    'A powerful and insightful software suite to explore, understand and take action on cloud services spending.',
  DEMO_BUTTON: 'View Demo',
  BOOK_DEMO_BUTTON: 'Schedule a Demo',
};

const mobile = {
  TITLE: 'CostOptix is now available!',
  MESSAGE: 'For the best experience, please use a desktop or tablet device.',
};

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDemoClick = () => {
    ReactGA.event(eventTypes.DEMO_LOGIN, { user: 'demo' });
    dispatch<AppDispatch>(setIsDemo(true));
  };

  const handleBookDemoClick = () => {
    ReactGA.event(eventTypes.BOOK_DEMO_BUTTON_CLICK);
    navigate(appRoutes.SCHEDULE_DEMO);
  };

  const MobileMessageBox = useMobileDevice(
    <Container>
      <MessageBox title={mobile.TITLE} message={mobile.MESSAGE} color="yellow" />
    </Container>,
    640
  );

  const LoginDemoButton = useMobileDevice(
    <HomePageActions>
      <form method="POST" action={BASE + DEMO_LOGIN}>
        <HomePageButton className="view-demo" data-testid="login-demo-button" onClick={handleDemoClick}>
          {content.DEMO_BUTTON}
        </HomePageButton>
      </form>
      <HomePageButton className="book-demo" data-testid="book-demo-button" onClick={handleBookDemoClick}>
        {content.BOOK_DEMO_BUTTON}
      </HomePageButton>
    </HomePageActions>,
    640,
    false
  );

  return (
    <>
      <HomePageWrapper>
        <HomePageMainLeft>
          <HomePageTitle>
            <StyledHeader>{content.TITLE}</StyledHeader>
          </HomePageTitle>
          {MobileMessageBox}
          <HomePageSubTitle>
            <StyledSubHeader>{content.SUBTITLE}</StyledSubHeader>
          </HomePageSubTitle>
          {LoginDemoButton}
        </HomePageMainLeft>
        <CookieBanner />
      </HomePageWrapper>
    </>
  );
};

export default HomePage;
