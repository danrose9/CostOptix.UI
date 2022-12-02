import React from 'react';
import { Routes, Route } from 'react-router-dom';
import * as appRoutes from './appRoutes';
import * as page from '../pages/index';
import PrivateRoute from './PrivateRoute';

export const ApplicationRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<page.InitializeApp />} />
      <Route path={appRoutes.HOME} element={<page.Home />} />
      <Route path={appRoutes.LANDING_PAGE} element={<page.landingPage />} />
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
        path={appRoutes.RESOURCE_SEARCH}
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
        path={appRoutes.GRAPH_DATA}
        element={
          <PrivateRoute>
            <page.TestPage />
          </PrivateRoute>
        }
      />
      <Route
        path={appRoutes.SERVICE_PROVIDERS}
        element={
          <PrivateRoute>
            <page.ConnectionPage />
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
        path={appRoutes.ALPHA_PROGRAM_SIGNUP}
        element={
          <PrivateRoute>
            <page.alphaProgramSignup />
          </PrivateRoute>
        }
      />
      <Route
        path={appRoutes.SESSION_EXPIRED}
        element={<page.SessionExpired />}
      />
      <Route path="*" element={<page.PageNotFound404 />} />
    </Routes>
  );
};

export default ApplicationRoutes;
