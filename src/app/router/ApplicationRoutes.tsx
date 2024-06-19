import React from 'react';
import { Routes, Route } from 'react-router-dom';
import * as appRoutes from './appRoutes';
import * as page from '../../components/pages/index';
import PrivateRoute from './PrivateRoute';
import { TermsOfService, PrivacyPolicy } from '../constants';
import { useLocation } from 'react-router-dom';
import { useTrackPageView } from 'src/hooks/useTrackPageView';
import Pricing from 'src/components/Pricing';
import HelpCenter from 'src/components/help-center/HelpCenter';
import ContactUs from 'src/components/ContactUs';
import ScheduleDemo from 'src/components/ScheduleDemo';
import HomePage from 'src/components/pages/homepage/HomePage';
import Blogs from 'src/components/blogs/Blogs';
import Blog from 'src/components/blogs/Blog';

export const SHOW_NAV_SIDEBAR_ROUTES = [
  appRoutes.QUERYFILTER,
  appRoutes.SETTINGS,
  appRoutes.COST_DASHBOARD,
  appRoutes.RESOURCES,
  appRoutes.RESOURCE_VIEW,
  appRoutes.QUERYFILTER,
  appRoutes.COST_CONTAINERS,
  appRoutes.SERVICE_PROVIDERS,
];

export const ApplicationRoutes = () => {
  const location = useLocation();
  const pathname = location.pathname + location.search;
  useTrackPageView(pathname, [location]);

  return (
    <Routes>
      <Route path="/" element={<page.ExternalPage children={<HomePage />} className="home-page" />} />
      <Route path={appRoutes.SIGNUP} element={<page.Signup />} />
      <Route path={appRoutes.LOGIN} element={<page.Login />} />
      <Route path={appRoutes.AUTH_RESPONSE} element={<page.AuthResponse />} />
      <Route path={appRoutes.HOME} element={<page.ExternalPage children={<HomePage />} className="home-page" />} />
      <Route path={appRoutes.TERMS} element={<page.ExternalPage children={<TermsOfService />} />} />
      <Route path={appRoutes.PRIVACY} element={<page.ExternalPage children={<PrivacyPolicy />} />} />

      <Route path={appRoutes.INITIALIZE_APP} element={<page.InitializeApp />} />
      <Route path={appRoutes.LANDING_PAGE} element={<page.LandingPage />} />
      <Route path={appRoutes.HELP_CENTER} element={<page.ExternalPage children={<HelpCenter />} />} />
      <Route path={appRoutes.BLOGS} element={<page.ExternalPage children={<Blogs />} />} />
      <Route path={appRoutes.BLOG} element={<page.ExternalPage children={<Blog />} />} />

      <Route path={appRoutes.PRICING_PAGE} element={<page.ExternalPage children={<Pricing />} />} />
      <Route path={appRoutes.CONTACT_PAGE} element={<page.ExternalPage children={<ContactUs />} />} />
      <Route path={appRoutes.SCHEDULE_DEMO} element={<page.ExternalPage children={<ScheduleDemo />} />} />
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
            <page.ServiceConnection />
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
