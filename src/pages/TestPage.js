import React from 'react';
import { Button } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { refreshCostDashboard } from '../services/redux/reducers/costDashboardSlice';

const TestPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnClick = () => {
    // navigate({ to: '/resource-view' });
    dispatch(refreshCostDashboard(true));
  };

  return (
    <>
      <div>
        <Button onClick={handleOnClick}>My Test Button</Button>
      </div>
    </>
  );
};

export default TestPage;
