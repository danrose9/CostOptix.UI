import React from 'react';
import styled from 'styled-components';
import { Card, Image, Button } from 'semantic-ui-react';

const CardHeader = styled(Card.Header)`
  padding: 0 2px;
`;

const HeaderContainer = styled.div`
  display: grid;
  font-size: 2.5em;
  width: -webkit-fill-available;
`;

const CardContent = styled(Card.Content)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.1em;
  height: 7em;
  text-align: left;
`;

export const ResourceCard = (props) => {
  return (
    <Card raised onClick={props.onClick}>
      <CardContent>
        <CardHeader>{props.title}</CardHeader>
      </CardContent>
      <Card.Description textAlign="center">{props.content}</Card.Description>
      <Card.Content extra>{props.description}</Card.Content>
    </Card>
  );
};

export default ResourceCard;
