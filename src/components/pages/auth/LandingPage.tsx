import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../services/redux/store';
import { incrementLoginCount } from '../../../services/redux/thunks/userProfileThunk';
import { useNavigate } from 'react-router-dom';
import WelcomeModal from '../../modals/WelcomeModal';
import { STORAGE } from '../../../app/constants/StorageKeys';
import { useIsDemo } from '../../hoc/withDemo';
import { fetchAccountsAndServiceProviders } from '../../../services/api/fetchAccountsAndServiceProviders';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../services/redux/rootReducer';
import { reduxState } from '../../../services/redux/reduxState';
import * as appRoutes from '../../../app/router/appRoutes';

interface LandingPageProps {}

const LandingPage: React.FC<LandingPageProps> = () => {
  const dispatch = useDispatch();
  const isDemo = useIsDemo();
  const navigate = useNavigate();

  // Initialize the state directly with the value from local storage to prevent flickering
  const hideWelcomePage = localStorage.getItem(STORAGE.HIDE_WELCOME_PAGE) === 'true' && !isDemo;

  const { count } = useSelector((state: IRootState) => state[reduxState.COST_DASHBOARD]);

  const [dismissWelcomePage, setDismissWelcomePage] = useState<boolean>(hideWelcomePage);
  const [beginTour, setBeginTour] = useState<boolean>(false);

  const setDismissWelcomePageCallback = (val: boolean) => {
    setDismissWelcomePage(val);
  };

  const startTour = (val: boolean) => {
    setBeginTour(val);
  };

  useEffect(() => {
    fetchAccountsAndServiceProviders({ dispatch, lastUpdated: '' });

    dispatch<AppDispatch>(incrementLoginCount());
  }, [dispatch]);

  // Define the redirection logic
  useEffect(() => {
    if (dismissWelcomePage) {
      if (count > 0) {
        // Redirect to cost-dashboard if count > 0
        navigate(appRoutes.COST_DASHBOARD, { state: { startTour: beginTour, tourType: 'default' } });
      } else {
        // Redirect to service-connections if count = 0
        navigate(appRoutes.SERVICE_PROVIDERS);
      }
    }
  }, [dismissWelcomePage, count, beginTour, navigate]);

  return (
    <>
      {dismissWelcomePage ? null : (
        <WelcomeModal
          setDismissWelcomePageCallback={setDismissWelcomePageCallback}
          startTour={startTour}
          isDemo={isDemo}
        />
      )}
    </>
  );
};

export default LandingPage;
