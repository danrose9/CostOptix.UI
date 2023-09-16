import React, { useState } from 'react';
import { Header, Image, Form } from 'semantic-ui-react';
import {
  PageContainer,
  ImageContainer,
  InputContainer,
  StyledGrid,
  StyledColumn,
  IdpContainer,
  TermsContainer,
} from './AuthStyles';
import * as images from '../../../assets/index';
import IdpSigninButton from '../../buttons/IdpSigninButton';
import TermsOfServiceModal from '../../modals/TermsOfServiceModal';
import { BASE, EXTERNAL_LOGIN } from '../../../services/api/apiEndpoints';

interface ILoginProps {}

const Login: React.FC<ILoginProps> = (props) => {
  const [open, setOpen] = useState(false);
  return (
    <PageContainer>
      <ImageContainer>
        <Image src={images.LOGOBLUE} size="medium" />
      </ImageContainer>
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
      <TermsContainer>
        <a href="#">Privacy Policy</a>

        <TermsOfServiceModal />
      </TermsContainer>
    </PageContainer>
  );
};

export default Login;
