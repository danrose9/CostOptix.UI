import React, { useState } from 'react';
import { Button, Modal, Header, Input, Segment, Grid, Icon, Divider, Container, Checkbox } from 'semantic-ui-react';
import * as appRoutes from '../../app/appRoutes';
import { useNavigate } from 'react-router-dom';
import { Border, StyledText, StyledForm, StyledFormField } from '../../styles/StyledBetaProgramSignup';
import { validateEmail } from '../../utils/formValidation';

const BetaProgramSignup = () => {
  const [open, setOpen] = useState(true);
  const [isAuthorize, setIsAuthorize] = useState(false);
  const [isTermsApproved, setIsTermsApproved] = useState(false);
  const [emailAddress, setEmailAddress] = useState('');

  const isFormValid = validateEmail(emailAddress) && isTermsApproved;
  const navigate = useNavigate();

  const handleAuthorize = () => {
    setIsAuthorize(true);
  };

  const handleCancel = () => {
    setOpen(false);
    navigate(appRoutes.LANDING_PAGE);
  };

  const validateForm = (e) => {
    if (e.target.id === 'email') {
      setEmailAddress(e.target.value);
    }
    if (e.target.id === 'terms') {
      setIsTermsApproved(e.target.checked);
    }
  };

  return (
    <>
      <Grid columns={1}>
        <Grid.Column>
          <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            closeOnDimmerClick={false}
            closeOnEscape={false}
            size="large"
          >
            <Header icon data-testid="betaPage-1">
              <Icon name="world" />
              CostOptix Beta program
              <Header.Subheader>Helping to improve costs & services</Header.Subheader>
            </Header>
            <Border>
              <Segment placeholder>
                <Grid columns={2}>
                  <Divider vertical />
                  <Grid.Column>
                    <Container textAlign="left">
                      <StyledText>
                        CostOptix is currently looking for proactive participants to help us refine and define the
                        future of this product. In return you will be able to take full advantage of all available
                        features this application offers. <br />
                        <br />
                        If you wish to continue, enter your email address and click 'proceed', we will drop you a quick
                        authorization email to confirm your request to join the Beta program.
                        <br />
                        <br />
                        Once your email is verified we will respond to your request within 48 hours. If approved for the
                        Beta Program you can then log back in and access this service
                      </StyledText>
                    </Container>
                  </Grid.Column>

                  <Grid.Column textAlign="left">
                    <StyledForm size="large">
                      <StyledFormField
                        required
                        id="email"
                        value={emailAddress}
                        control={Input}
                        label="Email"
                        placeholder="joe.public@mycompany.com"
                        onChange={validateForm}
                      />
                      <StyledFormField
                        id="terms"
                        control={Checkbox}
                        label={<label>I accept the Terms of Service</label>}
                        onChange={validateForm}
                        required
                      />
                    </StyledForm>
                  </Grid.Column>
                </Grid>
              </Segment>
            </Border>
            <Modal.Actions>
              <Button onClick={() => handleCancel()}>Cancel</Button>
              <Button
                content="Proceed"
                labelPosition="right"
                icon="checkmark"
                onClick={() => handleAuthorize()}
                positive
                loading={isAuthorize}
                disabled={!isFormValid}
              />
            </Modal.Actions>
          </Modal>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default BetaProgramSignup;
