import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../services/redux/store';
import { incrementLoginCount } from '../../../services/redux/thunks/userProfileThunk';
import { Navigate } from 'react-router-dom';
import WelcomeModal from '../../modals/WelcomeModal';
// import { STORAGE } from '../../../app/constants/StorageKeys';
// import { useLocation } from 'react-router-dom';

interface LandingPageProps {}

const LandingPage: React.FC<LandingPageProps> = () => {
  const dispatch = useDispatch();
  // const location = useLocation();
  // const { isDemo } = location.state || {};

  // Initialize the state directly with the value from local storage to prevent flickering
  // const hideWelcomePage = localStorage.getItem(STORAGE.HIDE_WELCOME_PAGE) === 'true';

  /* The following code is commented out because it is not used anywhere in the app currently */
  // const [dismissWelcomePage, setDismissWelcomePage] = useState<boolean>(hideWelcomePage);
  const [dismissWelcomePage, setDismissWelcomePage] = useState<boolean>(true);

  const setDismissWelcomePageCallback = (val: boolean) => {
    setDismissWelcomePage(val);
  };

  useEffect(() => {
    dispatch<AppDispatch>(incrementLoginCount());
  }, [dispatch]);

  return (
    <>
      {dismissWelcomePage ? (
        <Navigate to="/dashboard-cost" />
      ) : (
        <WelcomeModal setDismissWelcomePageCallback={setDismissWelcomePageCallback} />
      )}
    </>
  );
};

export default LandingPage;
