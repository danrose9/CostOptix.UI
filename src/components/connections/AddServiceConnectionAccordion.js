/* Superceeded */

import React, { useState } from 'react';
import { Card, Button } from 'semantic-ui-react';
import { ButtonGroup } from '../../styles/StyledServiceConnections';
import ServiceConnectionTable from './ServiceConnectionTable';
import AddServiceAzure from './AddServiceAzure';
import AddServiceAWS from './providers/AddServiceAWS';
import ValidateServiceButton from '../buttons/StandardButton';

const ExtraContentAccordionClosed = ({ content, onClick }) => {
  return (
    <>
      <Card.Content extra>
        <ServiceConnectionTable card={content} />
      </Card.Content>
      <Card.Content extra>
        <Button onClick={onClick}>Accordian</Button>
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

export default ExtraContentAccordion;
