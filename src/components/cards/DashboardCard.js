import React from 'react';
import styled from 'styled-components';
import { Card, Icon } from 'semantic-ui-react';

const StyledCard = styled(Card)``;

const StyledCardHeader = styled(Card.Header)`
  flex: 1 70%;
  font-family: inherit !important;
`;

const StyledDescription = styled(Card.Description)`
  font-size: 2vw;
  padding: 0.2rem 0 0.7rem;
  color: #1678c2;
`;

const StyledCardContent = styled(Card.Content)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.1em;
  height: 7em;
`;

export const DashboardCard = (props) => {
  return (
    <StyledCard raised onClick={props.onClick}>
      <StyledCardContent>
        <StyledCardHeader>{props.title}</StyledCardHeader>
        <Icon fitted size={props.iconsize} circular color={props.iconcolor} name={props.icon} />
      </StyledCardContent>
      <StyledDescription textAlign="center">{props.content}</StyledDescription>
      <StyledCardContent extra>{props.description}</StyledCardContent>
    </StyledCard>
  );
};
