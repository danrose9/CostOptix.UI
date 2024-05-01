import React from 'react';
import {
  TransitionablePortal,
  Segment as SemanticSegment,
  Message as SemanticMessage,
  Icon as SemanticIcon,
} from 'semantic-ui-react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import * as appRoutes from '../../../app/router/appRoutes';
import { HomePageButton } from '../../__styles__/ExternalPageStyles';

const LegalButtonName = 'Legal';
const PrivacyItemName = 'Privacy Policy';
const PrivacyItemDescription = 'How we handle your personal information.';
const TermsItemName = 'Terms of Service';
const TermsItemDescription = 'Agreement defining use of a service.';

const DropdownTransitionEffects = { animation: 'fade up', duration: 1000 };
const TransitionMouseLeaveDelay = 500;

const Message = styled(SemanticMessage)`
  cursor: pointer;
  &.privacy {
    > .icon {
      margin-right: 0.9em;
    }
  }
`;

const Segment = styled(SemanticSegment)`
  right: 18em;
  position: absolute !important;
  top: 5em;
  z-index: 1000;
`;

const Icon = styled(SemanticIcon)`
  padding-left: 1em;
`;

export const HomePageDropdownItems = () => {
  const navigate = useNavigate();
  const handleOnClick = (route: string) => {
    navigate(route);
  };

  return (
    <TransitionablePortal
      openOnTriggerMouseEnter
      closeOnTriggerMouseLeave
      closeOnPortalMouseLeave
      mouseLeaveDelay={TransitionMouseLeaveDelay}
      transition={DropdownTransitionEffects}
      trigger={
        <HomePageButton className="transparent">
          {LegalButtonName} <Icon name="angle down" />
        </HomePageButton>
      }
    >
      <Segment>
        <>
          <Message
            className="privacy"
            size="mini"
            icon="privacy"
            header={PrivacyItemName}
            content={PrivacyItemDescription}
            data-testid="privacy"
            onClick={() => handleOnClick(appRoutes.PRIVACY)}
          />
          <Message
            size="mini"
            icon="handshake outline"
            header={TermsItemName}
            content={TermsItemDescription}
            data-testid="terms"
            onClick={() => handleOnClick(appRoutes.TERMS)}
          />
        </>
      </Segment>
    </TransitionablePortal>
  );
};
