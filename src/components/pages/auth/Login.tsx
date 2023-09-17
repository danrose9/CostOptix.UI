import React from 'react';
import { Header } from 'semantic-ui-react';
import { InputContainer, StyledGrid, StyledColumn, IdpContainer, LoginContainer } from './AuthStyles';
import IdpSigninButton from '../../buttons/IdpSigninButton';
import AuthPageWrapper from './AuthPageWrapper';
import CloseButton from '../../buttons/CloseButton';
import * as appRoutes from '../../../app/appRoutes';
import { useNavigate } from 'react-router-dom';

interface ILoginProps {
  children?: React.ReactNode;
}

const Login: React.FC<ILoginProps> = ({ children }) => {
  const navigate = useNavigate();
  return (
    <AuthPageWrapper>
      <InputContainer className="login-form">
        <CloseButton onClick={() => navigate(appRoutes.HOME)} />
        <StyledGrid>
          <StyledColumn className="full-width">
            <Header as="h2" color="teal" textAlign="center">
              Sign in to CostOptix
            </Header>

            <IdpContainer>
              <IdpSigninButton idpName="Azure" />
            </IdpContainer>
            <LoginContainer onClick={() => navigate(appRoutes.SIGNUP)} data-testid="navigate-button">
              Looking for the signup page?
            </LoginContainer>
          </StyledColumn>
        </StyledGrid>
      </InputContainer>
    </AuthPageWrapper>
  );
};

export default Login;
