import React, { useState, useContext, useEffect } from 'react';
import { Header, Modal } from 'semantic-ui-react';
import { StyledContent } from '../../styles/StyledServiceConnections';
import { AddServiceAzure, AddServiceAWS } from './index';
import { ProviderImage } from '../ProviderImage';
import styled from 'styled-components';
import StandardButton from '../buttons/StandardButton';
import { isValid } from '../../utils/formValidation';
import { DemoContext } from '../../app/DemoContext';

const ModalHeader = styled(Header)`
  &&& {
    display: flex;
    align-items: center;
  }
`;

const ActionButtons = styled(Modal.Content)`
  &&& {
    display: flex;
    justify-content: space-between;
  }
`;

const AddServiceConnectionModal: React.FC<any> = (props) => {
  const [open, setOpen] = useState(false);
  const [isButtonDisabled, setIsButonDisabled] = useState(true);

  const [formData, setFormData] = useState({
    applicationId: null,
    secretValue: null,
  });

  const provider = props.provider.provider as string;

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setIsButonDisabled(isValid(formData));
  }, [formData]);

  const handleOnClose = () => {
    setOpen(false);
  };

  const isDemo = useContext(DemoContext);

  return (
    <Modal
      centered
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<StandardButton disabled={isDemo} positive={true} label="Add new connection" />}
    >
      <ModalHeader>
        <ProviderImage provider={props.provider.provider} size="big" floated="left" data-testid="sc-provider-image" />
        <p style={{ fontSize: '1.2em', paddingLeft: '1.5em' }}>
          Add a new {props.provider.provider} Service Connection
        </p>
      </ModalHeader>
      <Modal.Content>
        <Modal.Description>
          <StyledContent>
            By clicking proceed you will be redirect to {props.provider.vendor} where you will be asked to grant access
            for this application to {props.provider.name}. This authorization will need to be approved by an
            administrator.
            <br />
            <br />
            The information that we collect will be used by this application to report and analyse subscription and
            license data.
            <br />
            <br />
            To continue enter the required information below and click Proceed. Once you have approved access you will
            be redirected back to this page.
            <br />
            <br />
          </StyledContent>
          {provider === 'Azure' ? (
            <AddServiceAzure handleChange={handleChange} />
          ) : (
            <AddServiceAWS handleChange={handleChange} />
          )}
        </Modal.Description>
      </Modal.Content>
      <ActionButtons>
        <StandardButton onClick={handleOnClose} label="Close" />
        <StandardButton disabled={isButtonDisabled} positive={true} label="Continue" />
      </ActionButtons>
    </Modal>
  );
};

export default AddServiceConnectionModal;
