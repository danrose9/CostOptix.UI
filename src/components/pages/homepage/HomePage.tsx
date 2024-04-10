import React from 'react';
import {
  StyledHeader,
  StyledSubHeader,
  PageContainer,
  HomePageMainContent,
  HomePageMainLeft,
  HomePageTitle,
  HomePageSubTitle,
  HomePageActions,
  HomePageButton,
} from '../../__styles__/HomePageStyles';
import { BASE, DEMO_LOGIN } from '../../../services/api/apiEndpoints';
import HomePageNav from './HomePageNav';
import { AppDispatch } from 'src/services/redux/store';
import { useDispatch } from 'react-redux';
import { setIsDemo } from '../../../services/redux/reducers/userProfileSlice';
import CookieBanner from '../../CookieBanner';
import ReactGA from 'react-ga4';
import { eventTypes } from '../../../hooks/useTrackEvent';
import MessageBox from '../../MessageBox';
import { useMobileDevice } from 'src/hooks/useMobileDevice';
import { Container } from 'semantic-ui-react';

const content = {
  TITLE: 'Reduce Your Cloud Spending Costs Effectively with CostOptix',
  SUBTITLE:
    'A powerful and insightful software suite to explore, understand and take action on cloud services spending.',
  DEMO_BUTTON: 'View Demo',
};

const mobile = {
  TITLE: 'CostOptix is now available!',
  MESSAGE: 'For the best experience, please use a desktop or tablet device.',
};

const HomePage = () => {
  const dispatch = useDispatch();

  const handleDemoClick = () => {
    ReactGA.event(eventTypes.DEMO_LOGIN, { user: 'demo' });
    dispatch<AppDispatch>(setIsDemo(true));
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
    </HomePageActions>,
    640,
    false
  );

  return (
    <>
      <PageContainer fluid data-testid="homePage-2" className="home-page">
        <HomePageNav />

        <HomePageMainContent>
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
        </HomePageMainContent>
      </PageContainer>
    </>
  );
};

export default HomePage;
