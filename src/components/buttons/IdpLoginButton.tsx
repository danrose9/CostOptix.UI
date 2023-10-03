import React from 'react';
import { Button } from 'semantic-ui-react';
import styled from 'styled-components';
import { ProviderImage } from '../ProviderImage';
import { BASE, EXTERNAL_LOGIN, EXTERNAL_SIGNUP, RETURN_URL } from '../../services/api/apiEndpoints';

const StyledButton = styled(Button)`
  width: 100%;
  height: 3em;
  font-size: 16px !important;
  border: 1px solid #636d77 !important;
  display: flex !important;
  justify-content: space-around;
  align-items: center;
  border-radius: 10px !important;
  background: none !important;
  font-family: 'system-ui', sans-serif !important;
  &:hover {
    background-color: #dedede;
  }
`;

const ButtonText = styled.div`
  font-weight: 600;
  font-size: 1em;
  color: #636d77;
  padding-left: 1em;
`;

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
`;

interface IIdpLoginButtonProps {
  idpName: string;
  organization?: string;
  emailAddress?: string;
}

export const IdpLoginButton: React.FC<IIdpLoginButtonProps> = ({ idpName, organization, emailAddress }) => {
  const isSignup = organization && emailAddress;

  const actionUrl = isSignup
    ? `${
        BASE + EXTERNAL_SIGNUP
      }?provider=${idpName}&returnUrl=${RETURN_URL}&newSignUpOrgName=${organization}&newSignUpUserContactEmail=${emailAddress}`
    : `${BASE + EXTERNAL_LOGIN}?provider=${idpName}&returnUrl=${RETURN_URL}`;

  return (
    <form method="POST" action={actionUrl}>
      <StyledButton>
        <ButtonContent>
          <ProviderImage provider={idpName} size="mini" floated="left" />
          <ButtonText>Continue with {idpName}</ButtonText>
        </ButtonContent>
      </StyledButton>
    </form>
  );
};

export default IdpLoginButton;
