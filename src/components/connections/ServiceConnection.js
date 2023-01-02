import React, { useReducer } from 'react';
import { Card, Button, Divider } from 'semantic-ui-react';
import { ServiceConnectionPage } from '../../styles/StyledServiceConnections';
import { PageTitle } from '../PageTitle';
import { ServiceConnections as ServiceConnectionCards } from './ServiceConnections';
import ServiceConnectionTable from './ServiceConnectionTable';
import { ProviderImage } from '../ProviderImage';
import AddServiceAzure from './AddServiceAzure';
import AddServiceAWS from './AddServiceAWS';

function ExtraContentAccordionClosed({ content, onClick }) {
  return (
    <>
      <Card.Content extra>
        <ServiceConnectionTable card={content} />
      </Card.Content>
      <Card.Content extra>
        <Button onClick={onClick}>Add New Connection</Button>
      </Card.Content>
    </>
  );
}

const RenderAddService = (props) => {
  switch (props.provider) {
    case 'Azure':
      return <AddServiceAzure />;
    case 'AWS':
      return <AddServiceAWS />;
    default:
      return null;
  }
};

function ExtraContentAccordionOpened({ content, onClick }) {
  return (
    <>
      <Card.Content>
        <RenderAddService provider={content} />
      </Card.Content>
      <Card.Content extra>
        <Button onClick={onClick}>Close</Button>
      </Card.Content>
    </>
  );
}

function ExtraContentAccordion({ open, content, onToggle }) {
  return open === true ? (
    <ExtraContentAccordionOpened content={content.provider} onClick={onToggle} />
  ) : (
    <ExtraContentAccordionClosed content={content} onClick={onToggle} />
  );
}

function cardStateReducer(state, { type, payload }) {
  if (type === 'TOGGLE') {
    var index = payload.card;
    var value = state[index];
    return [...state.slice(0, index), !value, ...state.slice(index + 1, Infinity)];
  }

  return state;
}

const ServiceConnection = () => {
  const [state, dispatch] = useReducer(cardStateReducer, [false]);

  function toggleCard(card) {
    return function () {
      dispatch({ type: 'TOGGLE', payload: { card } });
    };
  }

  return (
    <ServiceConnectionPage>
      <PageTitle title="Service Connections" />
      <Divider />
      <Card.Group itemsPerRow={2}>
        {ServiceConnectionCards.filter((card) => card.active).map((card, index) => {
          return (
            <Card key={index} color={card.color} style={{ height: '100%' }}>
              <Card.Content>
                <ProviderImage floated="left" provider={card.provider} size="tiny" />
                <Card.Header>{card.name}</Card.Header>
                <Card.Meta>{card.description}</Card.Meta>
                <Card.Meta>{card.details}</Card.Meta>
              </Card.Content>
              <ExtraContentAccordion content={card} onToggle={toggleCard(index)} open={state[index]} />
            </Card>
          );
        })}
      </Card.Group>
    </ServiceConnectionPage>
  );
};

export default ServiceConnection;
