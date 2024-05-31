import React, { useState, useEffect } from 'react';
import * as appRoutes from './router/appRoutes';
import { ApplicationContainer, MainPage, ApplicationContent } from '../styles/AppStyles';
import Navbar from '../components/navbar/Navbar';
import AppSidebar from '../components/sidebar/AppSidebar';
import ApplicationRoutes, { HIDE_NAV_SIDEBAR_ROUTES } from './router/ApplicationRoutes';
import { useIdleTimer } from 'react-idle-timer';
import { useNavigate, useLocation } from 'react-router-dom';
import ErrorDefault from '../components/pages/ErrorDefault';
import { ErrorBoundary } from 'react-error-boundary';
import { isAuthenticated } from '../services/api/processToken';
import Tour from '../components/productTour/Tour';
import { useLogout } from 'src/hooks/useLogout';

const SESSION_TIMEOUT = process.env.REACT_APP_SESSION_TIMEOUT;

export const AppContent = () => {
  const navigate = useNavigate();
  const [startTimer, setStartTimer] = useState(false);

  const location = useLocation();
  const { logout } = useLogout();
  const { startTour } = location.state || {};

  const showSidebar = () => {
    setSidebarState(!sidebarState);
  };

  const [sidebarState, setSidebarState] = useState(true);
  const handleOnIdle = () => {
    navigate(appRoutes.SESSION_EXPIRED);
  };

  const { start, pause } = useIdleTimer({
    timeout: 1000 * 60 * parseInt(SESSION_TIMEOUT ?? '0'),
    onIdle: handleOnIdle,
    startManually: true,
    stopOnIdle: true,
    debounce: 100,
  });

  useEffect(() => {
    const checkAuthentication = async () => {
      const authenticated = await isAuthenticated();
      setStartTimer(authenticated);
    };

    checkAuthentication();
  }, []);

  // useEffect hook to observe changes to startTimer
  useEffect(() => {
    if (startTimer) {
      start();
    } else {
      pause();
    }
  }, [startTimer, start, pause]);

  const shouldHideNavSidebar = HIDE_NAV_SIDEBAR_ROUTES.includes(location.pathname);

  return (
    <>
      <ErrorBoundary
        FallbackComponent={ErrorDefault}
        onReset={() => {
          console.warn('Application Reset');
          logout();
          navigate(appRoutes.ROOT);
        }}
      >
        <Tour shouldStart={startTour} tourType={'default'} />
        <ApplicationContainer className="application-container">
          {!shouldHideNavSidebar && <AppSidebar sidebarState={sidebarState} />}
          <ApplicationContent className="application-content">
            {!shouldHideNavSidebar && <Navbar onClick={showSidebar} />}
            <MainPage className="main-page">
              <ApplicationRoutes />
            </MainPage>
          </ApplicationContent>
        </ApplicationContainer>
      </ErrorBoundary>
    </>
  );
};

export default AppContent;
