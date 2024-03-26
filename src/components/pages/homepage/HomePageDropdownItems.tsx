import React from 'react';
import { TransitionablePortal, Segment, Message as SemanticMessage } from 'semantic-ui-react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import * as appRoutes from '../../../app/router/appRoutes';
import { HomePageButton } from '../../__styles__/HomePageStyles';

const Message = styled(SemanticMessage)`
  cursor: pointer;
  &.privacy {
    > .icon {
      margin-right: 0.9em;
    }
  }
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
      mouseLeaveDelay={500}
      transition={{ animation: 'fade up', duration: 1000 }}
      trigger={
        <HomePageButton className="transparent" style={{ position: 'relative' }}>
          Legal
        </HomePageButton>
      }
    >
      <Segment style={{ right: '12em', position: 'absolute', top: '5em', zIndex: 1000 }}>
        <>
          <Message
            className="privacy"
            size="mini"
            icon="privacy"
            header="Privacy Policy"
            content="How we handle your personal information."
            data-testid="privacy"
            onClick={() => handleOnClick(appRoutes.PRIVACY)}
          />
          <Message
            size="mini"
            icon="handshake outline"
            header="Terms of Service"
            content="Agreement defining use of a service."
            data-testid="terms"
            onClick={() => handleOnClick(appRoutes.TERMS)}
          />
        </>
      </Segment>
    </TransitionablePortal>
  );
};
