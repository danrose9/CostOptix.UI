import React, { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { reduxState } from '../services/redux/reduxState';
import { Button, Modal } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import * as appRoutes from '../app/appRoutes';
import { Logout } from '../components/auth/Logout';

const SessionExpired = () => {
  const navigate = useNavigate();

  const { isDemo } = useSelector((state) => state[reduxState.USER_PROFILE]);

  const handleLogout = useCallback(() => {
    navigate(appRoutes.HOME);
  }, [navigate]);

  useEffect(() => {
    Logout();
  }, []);

  useEffect(() => {
    if (isDemo) {
      handleLogout();
    }
  });

  return (
    <>
      <Modal
        size="tiny"
        closeOnEscape={false}
        closeOnDimmerClick={false}
        open={true}
      >
        <Modal.Header>Session Expired</Modal.Header>
        <Modal.Content>
          <p>Your session has expired</p>
        </Modal.Content>
        <Modal.Actions>
          <Button positive onClick={() => handleLogout()}>
            OK
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default SessionExpired;
