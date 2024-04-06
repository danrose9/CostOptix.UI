import React from 'react';
import { HomePageButton } from '../../__styles__/HomePageStyles';
import ReactGA from 'react-ga4';
import { eventTypes } from 'src/hooks/useTrackEvent';
import { useNavigate } from 'react-router-dom';
import * as appRoutes from '../../../app/router/appRoutes';
import { useLogout } from 'src/hooks/useLogout';
import { useIsDemo } from 'src/components/hoc/withDemo';
import { log } from 'console';

const LOGIN = 'Login';
const GET_STARTED = 'Get Started';
interface HomePageNavButtonGroupProps {}

const HomePageNavLogin: React.FC<HomePageNavButtonGroupProps> = (props) => {
  const navigate = useNavigate();
  const { logout } = useLogout();
  const isDemo = useIsDemo();

  const handleButtonClick = async (route: string, eventType: string) => {
    ReactGA.event(eventType);
    navigate(route);
    if (isDemo) {
      await logout();
    }
  };
  return (
    <>
      <HomePageButton
        className="login"
        onClick={() => handleButtonClick(appRoutes.LOGIN, eventTypes.LOGIN_BUTTON)}
        role="button"
        data-testid="login-ext-button"
      >
        {LOGIN}
      </HomePageButton>
      <HomePageButton
        className="get-started"
        onClick={() => handleButtonClick(appRoutes.SIGNUP, eventTypes.SIGNUP_BUTTON)}
        role="button"
        data-testid="get-started-button"
      >
        {GET_STARTED}
      </HomePageButton>
    </>
  );
};

export default HomePageNavLogin;
