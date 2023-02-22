import React, { useState, useContext, useEffect } from 'react';
import { Header, Modal, Message } from 'semantic-ui-react';
import { StyledContent } from '../../styles/StyledServiceConnections';
import { AddServiceAzure, AddServiceAWS } from './index';
import { ProviderImage } from '../ProviderImage';
import styled from 'styled-components';
import StandardButton from '../buttons/StandardButton';
import { isValid } from '../../utils/formValidation';
import { DemoContext } from '../../app/DemoContext';
import fetchCloudBillingAccounts from '../../services/api/fetchCloudBillingAccounts';
import { ServiceConnectionWarning } from '../messages';
import ListServiceConnectionModal from './ListServiceConnectionModal';

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

const StyledStandardButton = styled(StandardButton)`
  &&& {
    margin-left: 1em;
  }
`;

const AddServiceConnectionModal: React.FC<any> = (props) => {
  const [open, setOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);
  const [isButtonDisabled, setIsButonDisabled] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  const [error, setError] = useState({
    isError: false,
    errorMessage: null,
  });

  const [formData, setFormData] = useState({
    applicationId: '',
    secretValue: '',
    directoryId: '',
  });

  const provider = props.provider.provider as string;

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setIsButonDisabled(isValid(formData));
  }, [formData]);

  const handleOnSubmit = async () => {
    setIsFetching(true);
    const args = {
      ...formData,
      provider: provider,
    };
    const accounts = await fetchCloudBillingAccounts(args);
    setIsFetching(false);
    setSecondOpen(true);
    console.log(accounts);
  };

  const isDemo = useContext(DemoContext);

  return (
    <>
      <Modal
        centered
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<StandardButton disabled={isDemo} positive={true} label="Add new connection" />}
      >
        <ModalHeader>
          <ProviderImage provider={props.provider.provider} size="big" floated="left" data-testid="sc-provider-image" />
          <p style={{ fontSize: '1.2em', paddingLeft: '1.5em' }} data-testid="sc-provider-header">
            Add a new {props.provider.provider} Service Connection
          </p>
        </ModalHeader>
        <Modal.Content>
          <Modal.Description>
            <StyledContent>
              By clicking proceed you will be redirect to {props.provider.vendor} where you will be asked to grant
              access for this application to {props.provider.name}. This authorization will need to be approved by an
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
          <StandardButton
            onClick={() => {
              setOpen(false);
            }}
            label="Close"
          />
          <div style={{ display: 'inline-flex' }}>
            {error.isError ? <ServiceConnectionWarning content="Invalid Thingy ma jiggery" /> : null}
            <StyledStandardButton
              disabled={isButtonDisabled}
              positive={true}
              label="Continue"
              onClick={handleOnSubmit}
              loading={isFetching}
            />
          </div>
        </ActionButtons>
      </Modal>
      {/* <ListServiceConnectionModal onClose={false} open={secondOpen} /> */}
      <Modal onClose={() => setSecondOpen(false)} open={secondOpen} size="small">
        <Header icon>Billing Accounts found</Header>
        <Modal.Content>
          <p>
            We've found the folllowing billing accounts associated with your service provider. Select the accounts you
            would like to add to CostOptix
          </p>
        </Modal.Content>
        <Modal.Actions></Modal.Actions>
      </Modal>
    </>
  );
};

export default AddServiceConnectionModal;
