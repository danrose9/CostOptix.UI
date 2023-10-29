import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../services/redux/store';
import { incrementLoginCount } from '../../../services/redux/thunks/userProfileThunk';
import { Navigate } from 'react-router-dom';

const LandingPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<AppDispatch>(incrementLoginCount());
  }, [dispatch]);

  return (
    <>
      <Navigate to="/dashboard-cost" />
    </>
  );
};

export default LandingPage;
