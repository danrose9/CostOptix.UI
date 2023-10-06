import React from 'react';
import { Image } from 'semantic-ui-react';
import * as images from '../../../assets/index';
import { PageContainer, ImageContainer, TermsContainer } from './AuthStyles';
import LegalDeclarationsModal from '../../modals/LegalDeclarationsModal';
import { TermsOfService, PrivacyPolicy } from '../../../app/constants/index';

interface IAuthPageWrapperProps {
  children: React.ReactNode;
  hideTerms?: boolean;
}

const AuthPageWrapper: React.FC<IAuthPageWrapperProps> = ({ children, hideTerms }) => {
  return (
    <PageContainer>
      <ImageContainer>
        <Image src={images.LOGOBLUE} size="medium" />
      </ImageContainer>
      {children}
      {!hideTerms ? (
        <TermsContainer>
          <LegalDeclarationsModal header="Privacy Policy" lastUpdated="September 15, 2023" icon="lock">
            <PrivacyPolicy />
          </LegalDeclarationsModal>
          <LegalDeclarationsModal header="Terms of Service" icon="handshake outline" data-testid="tos-modal-trigger">
            <TermsOfService />
          </LegalDeclarationsModal>
        </TermsContainer>
      ) : null}
    </PageContainer>
  );
};

export default AuthPageWrapper;
