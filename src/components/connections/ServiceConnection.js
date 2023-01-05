import React, { useReducer, useState } from 'react';
import { Card, Button, Divider } from 'semantic-ui-react';
import { ServiceConnectionPage, ButtonGroup } from '../../styles/StyledServiceConnections';
import { PageTitle } from '../PageTitle';
import { ServiceConnections as ServiceConnectionCards } from './ServiceConnections';
import ServiceConnectionTable from './ServiceConnectionTable';
import { ProviderImage } from '../ProviderImage';
import AddServiceAzure from './AddServiceAzure';
import AddServiceAWS from './AddServiceAWS';
import ValidateServiceButton from '../buttons/ValidateServiceButton';
import ServiceConnectionModal from './ServiceConnectionModal';

const ExtraContentAccordionClosed = ({ content, onClick }) => {
  return (
    <>
      <Card.Content extra>
        <ServiceConnectionTable card={content} />
      </Card.Content>
      <Card.Content extra>
        <Button onClick={onClick}>Accordian</Button>
        <ServiceConnectionModal />
      </Card.Content>
    </>
  );
};

const ExtraContentAccordionOpened = ({ content, onClick }) => {
  const { provider } = content;

  const [disableValidation, setDisableValidation] = useState(true);
  const [showValidation, setShowValidation] = useState(false);

  const handleSelect = () => setShowValidation(true);

  const RenderAddService = () => {
    switch (provider) {
      case 'Azure':
        return <AddServiceAzure handleSelect={handleSelect} />;
      case 'AWS':
        return <AddServiceAWS />;
      default:
        return null;
    }
  };

  return (
    <>
      <Card.Content>
        <RenderAddService />
      </Card.Content>
      <Card.Content extra>
        <ButtonGroup>
          <Button onClick={onClick}>Close</Button>
          {showValidation ? (
            <ValidateServiceButton positive={true} disabled={disableValidation} label="Validate" />
          ) : null}
        </ButtonGroup>
      </Card.Content>
    </>
  );
};

const ExtraContentAccordion = ({ open, content, onToggle }) => {
  return open === true ? (
    <ExtraContentAccordionOpened content={content} onClick={onToggle} />
  ) : (
    <ExtraContentAccordionClosed content={content} onClick={onToggle} />
  );
};

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
