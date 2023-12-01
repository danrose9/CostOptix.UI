import React, { useEffect, useCallback } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import * as appRoutes from '../../app/router/appRoutes';
import { Logout } from '../auth/Logout';
import { useIsDemo } from '../hoc/withDemo';

const SessionExpired = () => {
  const navigate = useNavigate();

  const isDemo = useIsDemo();

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
      <Modal size="tiny" closeOnEscape={false} closeOnDimmerClick={false} open={true}>
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
