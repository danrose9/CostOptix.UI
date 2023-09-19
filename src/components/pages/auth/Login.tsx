import React from 'react';
import { Header } from 'semantic-ui-react';
import { InputContainer, StyledGrid, StyledColumn, IdpContainer, LoginContainer } from './AuthStyles';
import IdpSigninButton from '../../buttons/IdpSigninButton';
import AuthPageWrapper from './AuthPageWrapper';
import CloseButton from '../../buttons/CloseButton';
import * as appRoutes from '../../../app/router/appRoutes';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const TermsContainer = styled.div`
  position: absolute;
  bottom: 0;
  padding: 2em;
`;

interface ILoginProps {
  children?: React.ReactNode;
}

const Login: React.FC<ILoginProps> = ({ children }) => {
  const navigate = useNavigate();
  const locationState = useLocation().state;
  const [isSignup, setIsSignup] = React.useState(!!locationState);

  console.log('isSignup', isSignup);
  return (
    <AuthPageWrapper>
      <InputContainer className="login-form">
        <CloseButton onClick={() => navigate(appRoutes.HOME)} />
        <StyledGrid>
          <StyledColumn className="full-width">
            <Header as="h2" color="teal" textAlign="center">
              Log in to CostOptix
            </Header>

            <IdpContainer>
              <IdpSigninButton idpName="Azure" />
            </IdpContainer>
            {!isSignup ? (
              <LoginContainer onClick={() => navigate(appRoutes.SIGNUP)} data-testid="navigate-button">
                Looking for the signup page?
              </LoginContainer>
            ) : null}
          </StyledColumn>
        </StyledGrid>
        {isSignup ? (
          <TermsContainer>
            By clicking "continue" with any of the social login options, you are creating an account, and agree to
            CostOptix Terms of Service and Privacy Policy
          </TermsContainer>
        ) : null}
      </InputContainer>
    </AuthPageWrapper>
  );
};

export default Login;
