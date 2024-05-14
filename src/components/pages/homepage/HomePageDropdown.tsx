import React from 'react';
import {
  TransitionablePortal,
  Segment as SemanticSegment,
  Message as SemanticMessage,
  Icon as SemanticIcon,
} from 'semantic-ui-react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { HomePageButton } from '../../__styles__/ExternalPageStyles';
import { HomePageDropdownItem } from 'src/types/menu-types';

const DropdownTransitionEffects = { animation: 'fade up', duration: 1000 };
const TransitionMouseLeaveDelay = 500;

const Message = styled(SemanticMessage)`
  cursor: pointer;
  &.shift-right {
    > .icon {
      margin-right: 0.8em;
    }
  }
`;

const Segment = styled(SemanticSegment)`
  right: 25em;
  position: absolute !important;
  top: 5em;
  z-index: 1000;
  width: 20em;
`;

const Icon = styled(SemanticIcon)`
  padding-left: 1em;
`;

interface HomePageDropdownProps {
  title: string;
  items: HomePageDropdownItem[];
}

export const HomePageDropdown: React.FC<HomePageDropdownProps> = ({ title, items }) => {
  const navigate = useNavigate();
  const handleOnClick = (route: string) => {
    navigate(route);
  };

  return (
    <TransitionablePortal
      openOnTriggerMouseEnter
      closeOnTriggerMouseLeave
      closeOnPortalMouseLeave
      closeOnTriggerClick
      mouseLeaveDelay={TransitionMouseLeaveDelay}
      transition={DropdownTransitionEffects}
      trigger={
        <HomePageButton className="transparent">
          {title} <Icon name="angle down" />
        </HomePageButton>
      }
    >
      <Segment>
        <>
          {items.map((item) => {
            return (
              <Message
                key={item.index}
                size="mini"
                className={item.className}
                icon={item.icon}
                header={item.title}
                content={item.content}
                onClick={() => handleOnClick(item.navigate)}
              />
            );
          })}
        </>
      </Segment>
    </TransitionablePortal>
  );
};
