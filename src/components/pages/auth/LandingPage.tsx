import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import WelcomeModal from '../../modals/WelcomeModal';
import { incrementLoginCount } from '../../../services/redux/thunks/userProfileThunk';
import { STORAGE } from '../../../app/constants/StorageKeys';
import { useIsDemo } from '../../hoc/withDemo';
import * as appRoutes from '../../../app/router/appRoutes';
import { AppDispatch } from 'src/services/redux/store';
import { IRootState } from 'src/services/redux/rootReducer';
import { useSelector } from 'react-redux';
import { reduxState } from 'src/services/redux/reduxState';
import { useTrackEvent } from 'src/hooks/useTrackEvent';

interface LandingPageProps {}

const LandingPage: React.FC<LandingPageProps> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isDemo = useIsDemo();

  const hideWelcomePage = localStorage.getItem(STORAGE.HIDE_WELCOME_PAGE) === 'true' && !isDemo;
  const [dismissWelcomePage, setDismissWelcomePage] = useState(hideWelcomePage);
  const [beginTour, setBeginTour] = useState(false);
  const billingAccountCount = location.state || 0;

  useEffect(() => {
    if (dismissWelcomePage && billingAccountCount !== 0) {
      navigate(appRoutes.COST_DASHBOARD, { state: { startTour: beginTour, tourType: 'default' } });
    }
    if (dismissWelcomePage && billingAccountCount === 0) {
      navigate(appRoutes.SERVICE_PROVIDERS, { state: { startTour: beginTour, tourType: 'newSignup' } });
    }
    dispatch<AppDispatch>(incrementLoginCount());
  }, [dismissWelcomePage, beginTour, dispatch, navigate, billingAccountCount]);

  const user_id = useSelector((state: IRootState) => state[reduxState.USER_PROFILE].id);
  const eventData = useMemo(() => ({ user: user_id }), [user_id]);

  useTrackEvent('user_id', eventData, user_id);

  return (
    <>
      {!dismissWelcomePage && (
        <WelcomeModal setDismissWelcomePageCallback={setDismissWelcomePage} startTour={setBeginTour} isDemo={isDemo} />
      )}
    </>
  );
};

export default LandingPage;
