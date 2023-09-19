import React, { useState } from 'react';
import { Form, Button, Header } from 'semantic-ui-react';
import * as appRoutes from '../../../app/router/appRoutes';
import { useNavigate } from 'react-router-dom';
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

interface ISignupProps {}

const Signup: React.FC<ISignupProps> = (props) => {
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

            <IdpContainer>
              <Button content="Next" size="big" positive disabled={!isFormValid} onClick={handleOnClick} />
            </IdpContainer>
            <LoginContainer onClick={() => navigate(appRoutes.LOGIN)}>
              Already signed up? Log in with single sign on
            </LoginContainer>
          </StyledColumn>

          {/* <StyledColumn className="continue-button">
            <IdpContainer>
              <Button content="Next" size="big" positive />
            </IdpContainer>
          </StyledColumn> */}
        </StyledGrid>
      </InputContainer>
    </AuthPageWrapper>
  );
};

export default Signup;
