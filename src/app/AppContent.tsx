import React, { useState, useEffect } from 'react';
import * as appRoutes from './router/appRoutes';
import { Container, MainPage, Main, ApplicationFooter } from '../styles/AppContent';
import Navbar from '../components/navbar/Navbar';
import { Sidebar } from '../components/sidebar/Sidebar';
import ApplicationRoutes from './router/ApplicationRoutes';
import { useIdleTimer } from 'react-idle-timer';
import { useNavigate } from 'react-router-dom';

import { withAuth } from '../components/hoc/withAuth';
import ErrorDefault from '../components/pages/ErrorDefault';
import { ErrorBoundary } from 'react-error-boundary';

import { ApplicationContextProvider } from './ApplicationContext';
import { DemoContextProvider } from './DemoContext';

import { APP_FOOTER } from './constants';
import { isAuthenticated } from '../utils/processToken';

const SESSION_TIMEOUT = process.env.REACT_APP_SESSION_TIMEOUT;
const NavbarWithAuth = withAuth(Navbar);
const SidebarWithAuth = withAuth(Sidebar);

export const AppContent = () => {
  const navigate = useNavigate();

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
    const authenticated = isAuthenticated();
    if (authenticated) {
      start();
    } else {
      pause();
    }
  }, [pause, start]);

  return (
    <>
      <DemoContextProvider>
        <ApplicationContextProvider>
          <ErrorBoundary
            FallbackComponent={ErrorDefault}
            onReset={() => {
              console.warn('Application Reset');
              navigate(appRoutes.ROOT);
            }}
          >
            <Container>
              <SidebarWithAuth sidebarState={sidebarState} />
              <Main>
                <NavbarWithAuth onClick={showSidebar} />
                <MainPage>
                  <ApplicationRoutes />
                </MainPage>
                <ApplicationFooter>
                  <p>{APP_FOOTER.CONTENT}</p>
                </ApplicationFooter>
              </Main>
            </Container>
          </ErrorBoundary>
        </ApplicationContextProvider>
      </DemoContextProvider>
    </>
  );
};

export default AppContent;
