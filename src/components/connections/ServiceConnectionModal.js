import React, { useState } from 'react';
import { Button, Header, Modal, Icon } from 'semantic-ui-react';
import { buildConsentUrl } from '../../utils/helper';
import { Microsoft365ServiceConnectionInput } from './Microsoft365ServiceConnectionInput';
// import { SalesforceServiceConnectionInput } from './SalesforceServiceConnectionInput';
import {
  StyledContent,
  AddConnectionButton,
} from '../../styles/StyledServiceConnections';

function ServiceConnectionModal(props) {
  const [open, setOpen] = useState(false);
  const [serviceConnectionInputs, setServiceConnectionInputs] = useState([]);

  const eventhandler = async (data) => {
    setServiceConnectionInputs(data);
  };

  const returnInputParameters = (connectionName) => {
    switch (connectionName) {
      case '365OFF':
        return <Microsoft365ServiceConnectionInput onChange={eventhandler} />;
      // case 'SALEFO':
      //   return <SalesforceServiceConnectionInput onChange={eventhandler} />;
      default:
      // do nothing
    }
  };

  const initializeConsentUrl = () => {
    var route = buildConsentUrl(
      '365OFF',
      serviceConnectionInputs['tenantDomain']
    );
    window.location.href = route;
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <AddConnectionButton disabled={props.disabled}>
          {props.title}
        </AddConnectionButton>
      }
    >
      <Header
        icon="id card outline"
        content="Add a new Service Connection"
      ></Header>
      <Modal.Content>
        <Modal.Description>
          <StyledContent>
            By clicking proceed you will be redirect to {props.vendor} where you
            will be asked to grant access for this application to {props.name}.
            This authorization will need to be approved by an administrator.
            <br />
            <br />
            The information that we collect will be used by this application to
            report and analyse subscription and license data.
            <br />
            <br />
            To continue enter the required information below and click Proceed.
            Once you have approved access you will be redirected back to this
            page.
            <br />
            <br />
          </StyledContent>
          {returnInputParameters(props.connectionName)}
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)} secondary>
          Cancel <Icon name="cancel" />
        </Button>
        <Button
          disabled={setServiceConnectionInputs['disableButton']}
          onClick={() => initializeConsentUrl()}
          primary
        >
          Proceed <Icon name="chevron right" />
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default ServiceConnectionModal;
