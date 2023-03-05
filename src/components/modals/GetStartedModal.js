import React, { useState } from 'react';
import { Button, Modal, Grid, Header, Icon, Container } from 'semantic-ui-react';
import { StyledText, Actions } from '../../styles/StyledBetaProgramSignup';
import * as appRoutes from '../../app/appRoutes';
import { useNavigate } from 'react-router-dom';
import { LoginDemo } from '../auth/Login';

export const GetStartedModal = (props) => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <Grid columns={1}>
      <Grid.Column>
        <Modal
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          closeOnDimmerClick={false}
          size="large"
          trigger={
            <Button data-testid="get-started-button" positive size="huge" style={{ fontSize: '1.7em' }}>
              {props.action}
            </Button>
          }
        >
          <Header icon data-testid="getStartedPage-1">
            <Icon name="searchengin" />
            CostOptix
            <Header.Subheader>Helping to improve costs & services</Header.Subheader>
          </Header>
          <Grid columns={1}>
            <Grid.Column>
              <Container textAlign="left">
                <StyledText>
                  Welcome to the 'Getting Started' page. We would like to help you get the most out of the CostOptix
                  experience.
                  <br />
                  <br />
                  If you would like to take a poke around and see what this application has to offer, then select
                  'Continue with Demo'. You will have access to everything, but using demo data.
                  <br />
                  <br />
                  Alternatively, if you would like to see CostOptix in full swing with your own data then please go
                  ahead and sign up for a limited trial. You have full access to CostOptix.
                  <br />
                  <br />
                  If you would like to continue using this application then we are actively looking for Beta customers
                  that we can work with to improve CostOptix. If you are interested in taking part on this program then
                  let us know your email address and we'll get things started for you.
                </StyledText>
              </Container>
            </Grid.Column>
          </Grid>

          <Actions>
            <Button
              onClick={() => navigate(appRoutes.BETA_PROGRAM_SIGNUP)}
              content="Join the Beta Program"
              labelPosition="right"
              icon="world"
              color="blue"
            />
            <Button content="Sign up for Trial" icon="paper plane" labelPosition="right" color="orange" />
            <LoginDemo content="Continue with Demo" labelPosition="right" icon="chart bar outline" color="teal" />
          </Actions>
        </Modal>
      </Grid.Column>
    </Grid>
  );
};
