import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Grid, Modal, Segment, Icon, Divider, Header } from 'semantic-ui-react';
import * as appRoutes from '../app/appRoutes';
import { StyledModal, BtnGroup, Border } from '../styles/StyledLandingPage';
import { useSelector, useDispatch } from 'react-redux';
import { reduxState } from '../services/redux/reduxState';
import { Logout } from '../components/auth/Logout';
import { incrementLoginCount } from '../services/redux/thunks/userProfileThunk';

const TrialMode = (props) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleAcceptTrialMode = () => {
    dispatch(incrementLoginCount());
    props.dismissModal(false);
    navigate(appRoutes.COST_DASHBOARD);
  };

  return (
    <Grid.Column>
      <Header icon>
        <Icon name="paper plane outline" />
        Continue with your trial
        <Header.Subheader>Remember, you only have {props.trialsLeft} free login left!</Header.Subheader>
      </Header>

      <Button primary onClick={() => handleAcceptTrialMode()}>
        Continue
      </Button>
    </Grid.Column>
  );
};

const BetaMode = (props) => {
  const navigate = useNavigate();

  const handleAcceptBetaMode = () => {
    props.dismissModal(false);
    navigate(appRoutes.BETA_PROGRAM_SIGNUP);
  };

  const handleLogout = () => {
    Logout();
    navigate(appRoutes.HOME);
  };

  return (
    <>
      <Grid.Column>
        <Header icon>
          <Icon name="world" />
          Join the Beta program
          <Header.Subheader>We'd love to hear your feedback.</Header.Subheader>
        </Header>
        <BtnGroup>
          <Button
            primary
            onClick={() => {
              handleAcceptBetaMode();
            }}
          >
            Yep, I'm in
          </Button>
          {props.showExitButton ? (
            <Button
              onClick={() => {
                handleLogout();
              }}
            >
              No Thanks
            </Button>
          ) : (
            ''
          )}
        </BtnGroup>
      </Grid.Column>
    </>
  );
};

const LandingPage = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const dismissModal = async (value) => {
    setIsOpen(value);
  };

  const remainingLogins = useSelector((state) => state[reduxState.USER_PROFILE].organization.remainingLogins);
  const { isDemo } = useSelector((state) => state[reduxState.USER_PROFILE]);

  useEffect(() => {
    if (isDemo) {
      navigate(appRoutes.COST_DASHBOARD);
    }
  }, [isDemo, navigate]);
  return (
    <>
      <Grid columns={1}>
        <Grid.Column>
          <StyledModal closeOnEscape={false} closeOnDimmerClick={false} open={isOpen} size="large">
            <Modal.Header class="modal-dialog">Welcome to CostOptix</Modal.Header>
            <Border>
              <Segment placeholder>
                <Grid columns={2} stackable textAlign="center">
                  {remainingLogins > 0 ? (
                    <>
                      <Divider vertical>Or</Divider>
                      <Grid.Row verticalAlign="middle"></Grid.Row>
                      <TrialMode dismissModal={dismissModal} trialsLeft={remainingLogins} />
                      <BetaMode dismissModal={dismissModal} />
                    </>
                  ) : (
                    <BetaMode dismissModal={dismissModal} showExitButton={true} />
                  )}
                </Grid>
              </Segment>
            </Border>
          </StyledModal>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default LandingPage;
