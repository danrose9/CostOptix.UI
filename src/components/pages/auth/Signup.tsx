import React, { useState } from 'react';
import { Form, Button, Header, Message, Icon } from 'semantic-ui-react';
import * as appRoutes from '../../../app/router/appRoutes';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  InputContainer,
  StyledGrid,
  StyledColumn,
  WelcomeDescription,
  IdpContainer,
  LoginContainer,
} from './AuthStyles';
import AuthPageWrapper from './AuthPageWrapper';
import { validateEmail } from '../../../utils/formValidation';
import CloseButton from '../../buttons/CloseButton';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

interface ISignupProps {}

const Signup: React.FC<ISignupProps> = (props) => {
  let query = useQuery();
  let error = query.get('error');

  const navigate = useNavigate();
  const [isTermsApproved, setIsTermsApproved] = useState(false);
  const [emailAddress, setEmailAddress] = useState('');
  const [organization, setOrganization] = useState('');
  const isFormValid = validateEmail(emailAddress) && isTermsApproved && organization.length > 0;

  const validateForm = (e: any) => {
    if (e.target.id === 'email') {
      setEmailAddress(e.target.value);
    }
    if (e.target.id === 'organization') {
      setOrganization(e.target.value);
    }
    if (e.target.id === 'terms') {
      setIsTermsApproved(e.target.checked);
    }
  };

  const handleOnClick = () => {
    navigate(appRoutes.LOGIN, { state: { emailAddress, organization } });
  };

  return (
    <AuthPageWrapper>
      <InputContainer>
        <CloseButton onClick={() => navigate(appRoutes.HOME)} />
        <StyledGrid>
          <StyledColumn>
            <Form>
              <Header as="h2" color="teal" textAlign="center">
                Welcome to CostOptix
              </Header>

              <WelcomeDescription>
                To get started please let us know the name of your organization and a contact email address.
              </WelcomeDescription>
              <Form.Input
                icon="building"
                iconPosition="left"
                label="Organization"
                placeholder="Organization"
                required
                id="organization"
                value={organization}
                onChange={validateForm}
              />
              <Form.Input
                icon="mail"
                iconPosition="left"
                label="Contact email address"
                placeholder="Contact email address"
                required
                id="email"
                value={emailAddress}
                onChange={validateForm}
              />
              <Form.Checkbox label="I agree to the Terms of Service" required id="terms" onChange={validateForm} />
            </Form>
            {error ? (
              <Message icon warning>
                <Icon name="warning" />
                <Message.Content>
                  <Message.Header>We can't seem to locate your organization</Message.Header>
                  Please complete the form above to sign up.
                </Message.Content>
              </Message>
            ) : null}

            <IdpContainer>
              <Button
                content="Next"
                size="big"
                positive
                disabled={!isFormValid}
                onClick={handleOnClick}
                data-testid="next-button"
              />
            </IdpContainer>
            {error ? null : (
              <LoginContainer onClick={() => navigate(appRoutes.LOGIN)}>
                Already signed up? Log in with single sign on
              </LoginContainer>
            )}
          </StyledColumn>
        </StyledGrid>
      </InputContainer>
    </AuthPageWrapper>
  );
};

export default Signup;
