import React, { useState, useEffect, createContext } from 'react';
import * as appRoutes from './appRoutes';
import { Container, MainPage, Main } from '../styles/AppContent';
import Navbar from '../components/navbar/Navbar';
import { Sidebar } from '../components/sidebar/Sidebar';
import ApplicationRoutes from '../app/ApplicationRoutes';
import { useIdleTimer } from 'react-idle-timer';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { reduxState } from '../services/redux/reduxState';

import { withAuth } from '../components/hoc/withAuth';
import ErrorDefault from '../pages/ErrorDefault';
import { ErrorBoundary } from 'react-error-boundary';

import { ApplicationContextProvider } from './ApplicationContext';
import { DemoContextProvider } from './DemoContext';

const SESSION_TIMEOUT = process.env.REACT_APP_SESSION_TIMEOUT;
const NavbarWithAuth = withAuth(Navbar);
const SidebarWithAuth = withAuth(Sidebar);

export const AppContent = () => {
  const navigate = useNavigate();

  const showSidebar = () => {
    setSidebarState(!sidebarState);
  };

  const { isAuthenticated } = useSelector((state) => state[reduxState.USER_PROFILE]);

  const [sidebarState, setSidebarState] = useState(true);
  const handleOnIdle = () => {
    navigate(appRoutes.SESSION_EXPIRED);
  };

  const { start, pause } = useIdleTimer({
    timeout: 1000 * 60 * SESSION_TIMEOUT,
    onIdle: handleOnIdle,
    startManually: true,
    stopOnIdle: true,
    debounce: 100,
  });

  useEffect(() => {
    if (isAuthenticated) {
      start();
    } else {
      pause();
    }
  }, [isAuthenticated, pause, start]);

  return (
    <>
      <DemoContextProvider>
        <ApplicationContextProvider>
          <ErrorBoundary
            FallbackComponent={ErrorDefault}
            onReset={() => {
              console.warn('Application Reset');
              navigate(appRoutes.COST_DASHBOARD);
            }}
          >
            <Container>
              <SidebarWithAuth sidebarState={sidebarState} />
              <Main>
                <NavbarWithAuth onClick={showSidebar} />
                <MainPage>
                  <ApplicationRoutes />
                </MainPage>
              </Main>
            </Container>
          </ErrorBoundary>
        </ApplicationContextProvider>
      </DemoContextProvider>
    </>
  );
};

export default AppContent;
