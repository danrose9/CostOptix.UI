import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import WelcomeModal from '../../modals/WelcomeModal';
import { incrementLoginCount } from '../../../services/redux/thunks/userProfileThunk';
import { STORAGE } from '../../../app/constants/StorageKeys';
import { useIsDemo } from '../../hoc/withDemo';
import * as appRoutes from '../../../app/router/appRoutes';
import { AppDispatch } from 'src/services/redux/store';

interface LandingPageProps {}

const LandingPage: React.FC<LandingPageProps> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isDemo = useIsDemo();

  const hideWelcomePage = localStorage.getItem(STORAGE.HIDE_WELCOME_PAGE) === 'true' && !isDemo;
  const [dismissWelcomePage, setDismissWelcomePage] = useState(hideWelcomePage);
  const [beginTour, setBeginTour] = useState(false);

  useEffect(() => {
    if (dismissWelcomePage) {
      navigate(appRoutes.COST_DASHBOARD, { state: { startTour: beginTour, tourType: 'default' } });
    }
    dispatch<AppDispatch>(incrementLoginCount());
  }, [dismissWelcomePage, beginTour, dispatch, navigate]);

  return (
    <>
      {!dismissWelcomePage && (
        <WelcomeModal setDismissWelcomePageCallback={setDismissWelcomePage} startTour={setBeginTour} isDemo={isDemo} />
      )}
    </>
  );
};

export default LandingPage;
