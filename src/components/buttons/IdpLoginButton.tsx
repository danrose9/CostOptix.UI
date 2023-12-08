import React from 'react';
import { ProviderImage } from '../ProviderImage';
import { BASE, EXTERNAL_LOGIN, EXTERNAL_SIGNUP, RETURN_URL } from '../../services/api/apiEndpoints';
import { IdpButton, IdpButtonText, IdpButtonContentWrapper } from './Button.styles';

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
      <IdpButton>
        <IdpButtonContentWrapper>
          <ProviderImage provider={idpName} size="mini" floated="left" />
          <IdpButtonText>Continue with {idpName}</IdpButtonText>
        </IdpButtonContentWrapper>
      </IdpButton>
    </form>
  );
};

export default IdpLoginButton;
