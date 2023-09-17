import React from 'react';
import { Form, Button, Header } from 'semantic-ui-react';
import * as appRoutes from '../../../app/appRoutes';
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

interface ISignupProps {}

const Signup: React.FC<ISignupProps> = (props) => {
  const navigate = useNavigate();

  return (
    <AuthPageWrapper>
      <InputContainer>
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
              />
              <Form.Input
                icon="mail"
                iconPosition="left"
                label="Contact email address"
                placeholder="Contact email address"
                required
              />
              <Form.Checkbox label="I agree to the Terms of Service" required />
            </Form>

            <IdpContainer>
              <Button content="Next" size="big" positive />
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
