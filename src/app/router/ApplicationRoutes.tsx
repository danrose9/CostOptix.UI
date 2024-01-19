import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import * as appRoutes from './appRoutes';
import * as page from '../../components/pages/index';
import PrivateRoute from './PrivateRoute';
import { TITLE } from '../constants/application';
import { TermsOfService, PrivacyPolicy } from '../constants';
import { useLocation } from 'react-router-dom';
import { useTrackPageView } from 'src/hooks/useTrackPageView';

export const HIDE_NAV_SIDEBAR_ROUTES = [
  appRoutes.HOME,
  appRoutes.LOGIN,
  appRoutes.SIGNUP,
  appRoutes.NOT_FOUND_404_PAGE,
  appRoutes.DEFAULT_ERROR_PAGE,
];

export const ApplicationRoutes = () => {
  const location = useLocation();
  const pathname = location.pathname + location.search;
  useTrackPageView(pathname, [location]);

  return (
    <Routes>
      <Route path="/" element={<page.Home />} />
      <Route path={appRoutes.SIGNUP} element={<page.Signup />} />
      <Route path={appRoutes.LOGIN} element={<page.Login />} />
      <Route path={appRoutes.AUTH_RESPONSE} element={<page.AuthResponse />} />
      <Route path={appRoutes.HOME} element={<page.Home />} />
      <Route path={appRoutes.TERMS} element={<page.LegalNotice title={TITLE.TERMS} content={<TermsOfService />} />} />
      <Route
        path={appRoutes.PRIVACY}
        element={<page.LegalNotice title={TITLE.PRIVACY} content={<PrivacyPolicy />} />}
      />
      <Route path={appRoutes.INITIALIZE_APP} element={<page.InitializeApp />} />
      <Route path={appRoutes.LANDING_PAGE} element={<page.LandingPage />} />
      <Route
        path={appRoutes.LOGOUT}
        element={
          <PrivateRoute>
            <page.LogoutPage />
          </PrivateRoute>
        }
      />
      <Route
        path={appRoutes.SETTINGS}
        element={
          <PrivateRoute>
            <page.Settings />
          </PrivateRoute>
        }
      />
      <Route
        path={appRoutes.COST_DASHBOARD}
        element={
          <PrivateRoute>
            <page.CostDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path={appRoutes.RESOURCES}
        element={
          <PrivateRoute>
            <page.ResourceList />
          </PrivateRoute>
        }
      />
      <Route
        path={appRoutes.RESOURCE_VIEW}
        element={
          <PrivateRoute>
            <page.ResourceView />
          </PrivateRoute>
        }
      />
      <Route
        path={appRoutes.SERVICE_PROVIDERS}
        element={
          <PrivateRoute>
            <page.ServiceConnectionPage />
          </PrivateRoute>
        }
      />
      <Route
        path={appRoutes.HELP_PAGE}
        element={
          <PrivateRoute>
            <page.HelpPage />
          </PrivateRoute>
        }
      />
      <Route
        path={appRoutes.DEFAULT_ERROR_PAGE}
        element={
          <PrivateRoute>
            <page.DefaultErrorPage />
          </PrivateRoute>
        }
      />
      <Route
        path={appRoutes.COST_CONTAINERS}
        element={
          <PrivateRoute>
            <page.CostContainerPage />
          </PrivateRoute>
        }
      />
      <Route
        path={appRoutes.QUERYFILTER}
        element={
          <PrivateRoute>
            <page.QueryFilter />
          </PrivateRoute>
        }
      />
      <Route
        path={appRoutes.TEST_PAGE}
        element={
          <PrivateRoute>
            <page.TestPage />
          </PrivateRoute>
        }
      />
      <Route path={appRoutes.SESSION_EXPIRED} element={<page.SessionExpired />} />
      <Route path="*" element={<page.PageNotFound404 />} />
    </Routes>
  );
};

export default ApplicationRoutes;
