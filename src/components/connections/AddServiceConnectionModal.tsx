import React, { useState } from 'react';
import { Button, Header, Modal } from 'semantic-ui-react';
import { StyledContent } from '../../styles/StyledServiceConnections';
import { AddServiceAzure, AddServiceAWS } from './index';
import { ProviderImage } from '../ProviderImage';
import styled from 'styled-components';
import ValidateServiceButton from '../buttons/ValidateServiceButton';
import { ICustomerServiceConnection, IServiceConnectionCard } from '../../types/index';

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

  const childToParent = (childdata: boolean) => {
    setIsButonDisabled(childdata);
  };

  console.log('isButtonDisabled', isButtonDisabled);

  const provider = props.provider.provider as string;

  const RenderAddService = ({ childToParent }: any) => {
    switch (provider) {
      case 'Azure':
        return (
          <>
            <AddServiceAzure childToParent={childToParent} />{' '}
          </>
        );
      case 'AWS':
        return <AddServiceAWS />;
      default:
        return null;
    }
  };

  const handleOnClose = () => {
    setOpen(false);
  };

  return (
    <Modal
      centered
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button positive>Add new connection</Button>}
    >
      <ModalHeader>
        <ProviderImage provider={props.provider.provider} size="big" floated="left" />
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
          <RenderAddService childToParent={(v: boolean) => setIsButonDisabled(v)} />
        </Modal.Description>
      </Modal.Content>
      <ActionButtons>
        <Button onClick={handleOnClose}>Close</Button>
        <ValidateServiceButton disabled={isButtonDisabled} positive={true} label="Continue" />
      </ActionButtons>
    </Modal>
  );
};

export default AddServiceConnectionModal;
