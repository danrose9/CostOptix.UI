import React from 'react';
import { Button } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

// import { fetchBillingAccounts } from '../services/redux/thunks/serviceProvidersThunk';

const TestPage = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate({ to: '/resource-view' });
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
