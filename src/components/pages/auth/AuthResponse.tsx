import React from 'react';
import { useLocation } from 'react-router-dom';
import { InputContainer } from './AuthStyles';
import AuthPageWrapper from './AuthPageWrapper';
import { Message, Icon, Button } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import * as appRoutes from '../../../app/router/appRoutes';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

enum AuthResponseEnum {
  UserNotInOrg = 'It looks like you are not a member of this organization. Please contact your administrator.',
  UserNotSignedUp = 'It looks like you are not signed up for CostOptix. Please contact your administrator.',
  Default = 'It looks like we had some trouble logging you in. Please try again.',
}

interface IAuthResponseProps {}

const MessageContainer = styled(Message)`
  font-size: 1em !important;
  margin: 5em 2em !important;
  width: auto !important;
`;

const ActionButtons = styled.div`
  text-align: center;
  left: 0;
  right: 0;
  margin: auto;
  top: 50%;
  position: absolute;
`;

const AuthResponse: React.FC<IAuthResponseProps> = (props) => {
  let query = useQuery();
  let error = query.get('error');

  const errorMessage = AuthResponseEnum[error as keyof typeof AuthResponseEnum] || AuthResponseEnum.Default;
  const navigate = useNavigate();
  return (
    <AuthPageWrapper hideTerms={true}>
      <InputContainer>
        <MessageContainer icon warning>
          <Icon name="warning" />
          <Message.Header>{errorMessage}</Message.Header>
        </MessageContainer>
        <ActionButtons>
          <Button positive onClick={() => navigate(appRoutes.HOME)}>
            Return Home
          </Button>
        </ActionButtons>
      </InputContainer>
    </AuthPageWrapper>
  );
};

export default AuthResponse;
