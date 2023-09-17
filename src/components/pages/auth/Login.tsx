import React from 'react';
import { Header } from 'semantic-ui-react';
import { InputContainer, StyledGrid, StyledColumn, IdpContainer } from './AuthStyles';
import IdpSigninButton from '../../buttons/IdpSigninButton';
import AuthPageWrapper from './AuthPageWrapper';

interface ILoginProps {}

const Login: React.FC<ILoginProps> = (props) => {
  return (
    <AuthPageWrapper>
      <InputContainer className="login-form">
        <StyledGrid>
          <StyledColumn className="full-width">
            <Header as="h2" color="teal" textAlign="center">
              Sign in to CostOptix
            </Header>

            <IdpContainer>
              <IdpSigninButton idpName="Azure" />
            </IdpContainer>
          </StyledColumn>
        </StyledGrid>
      </InputContainer>
    </AuthPageWrapper>
  );
};

export default Login;
