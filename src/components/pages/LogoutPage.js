import React, { useState } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import * as appRoutes from '../../app/router/appRoutes';
import { Logout } from '../auth/Logout';

const LogoutPage = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    Logout();
    navigate(appRoutes.HOME);
  };

  const handleClick = () => {
    setIsOpen(false);
    navigate.goBack();
  };

  return (
    <>
      <Modal size="tiny" closeOnEscape={false} closeOnDimmerClick={false} open={isOpen}>
        <Modal.Header>Logout</Modal.Header>
        <Modal.Content>
          <p>You are about to be logged out from CostOptix, do you wish to continue?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => handleClick()}>No thanks, take me back</Button>
          <Button positive onClick={() => handleLogout()} data-testid="logout-button">
            Yes, log me out
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default LogoutPage;
