import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import { ProviderImage } from '../ProviderImage';
import { BASE, EXTERNAL_LOGIN } from '../../services/api/apiEndpoints';

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

interface IIdpSigninButtonProps {
  idpName: string;
}

export const IdpSigninButton: React.FC<IIdpSigninButtonProps> = (props) => {
  const { idpName } = props;
  return (
    <form method="POST" action={`${BASE + EXTERNAL_LOGIN}`}>
      <StyledButton>
        <ButtonContent>
          <ProviderImage provider={idpName} size="mini" floated="left" />
          <ButtonText>Continue with {idpName}</ButtonText>
        </ButtonContent>
      </StyledButton>
    </form>
  );
};

export default IdpSigninButton;
