import React, { useState, useContext, Fragment, FC, useCallback } from 'react';
import { Modal } from 'semantic-ui-react';
import {
  StyledContent,
  ServiceConnectionHeader,
  ServiceConnectionModalWrapper,
} from './__styles__/StyledServiceConnections';
import { ProviderImage } from '../ProviderImage';
import StandardButton from '../buttons/StandardButton';
import { DemoContext } from '../../app/DemoContext';
import { ServiceConnectionWarning } from '../messages';
import ListServiceConnectionModal from './ListServiceConnectionModal';

import { ErrorType } from 'error-types';
import { IProviderProps } from 'provider-types';
import { ModalHeader, ActionButtons } from '../__styles__/StyledModal';
import AddServiceAzure from './providers/AddServiceAzure';
import AddServiceAWS from './providers/AddServiceAWS';

const AddServiceConnectionModal: FC<IProviderProps> = ({ cloudProvider }) => {
  const isDemo = useContext(DemoContext);

  const { provider, vendor, name } = cloudProvider;

  const [open, setOpen] = useState<boolean>(false);
  const [isFormButtonDisabled, setIsFormButtonDisabled] = useState<boolean>(true);

  const [error, setError] = useState<ErrorType>({
    isError: false,
    errorMessage: '',
  });

  const updateSetError = (errorData: ErrorType) => {
    setError(errorData);
  };

  const [formData, setFormData] = useState({});

  const closeFormModal = () => {
    setOpen(false);
  };

  const DisableButtonOnInvalidForm = useCallback(
    (val: boolean) => {
      setIsFormButtonDisabled(!val);
    },
    [setIsFormButtonDisabled]
  );

  // handle when initial modeal should open
  const handleOpenInitialModal = () => {
    // clear error state
    setError({ isError: false, errorMessage: '' });

    // disabled continue button
    setIsFormButtonDisabled(true);
  };

  const updateFormData = (formData: any) => {
    setFormData(formData);
  };

  // for each provider supply a new component exposing configuration steps
  const ProviderSteps = () => {
    switch (provider as string) {
      case 'Azure':
        return (
          <AddServiceAzure DisableButtonOnInvalidForm={DisableButtonOnInvalidForm} updateFormData={updateFormData} />
        );

      case 'AWS':
        return (
          <AddServiceAWS DisableButtonOnInvalidForm={DisableButtonOnInvalidForm} updateFormData={updateFormData} />
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Modal
        centered
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={
          <StandardButton
            disabled={isDemo}
            positive={true}
            label="Add new connection"
            onClick={handleOpenInitialModal}
          />
        }
      >
        <ModalHeader>
          <ProviderImage provider={provider} size="big" floated="left" data-testid="sc-provider-image" />
          <ServiceConnectionHeader data-testid="sc-provider-header">
            Add a new {provider} Service Connection
          </ServiceConnectionHeader>
        </ModalHeader>
        <Modal.Content scrolling>
          <Modal.Description>
            <StyledContent>
              By clicking proceed you will be redirect to {vendor} where you will be asked to grant access for this
              application to {name}. This authorization will need to be approved by an administrator.
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
            <Fragment>{ProviderSteps()}</Fragment>
          </Modal.Description>
        </Modal.Content>
        <ActionButtons>
          <StandardButton
            onClick={() => {
              setOpen(false);
            }}
            label="Close"
          />
          {error.isError ? <ServiceConnectionWarning content={error.errorMessage} /> : null}
          <ServiceConnectionModalWrapper>
            <ListServiceConnectionModal
              disabled={isFormButtonDisabled}
              cloudProvider={cloudProvider}
              formData={formData}
              updateSetError={updateSetError}
              closeFormModal={closeFormModal}
            />
          </ServiceConnectionModalWrapper>
        </ActionButtons>
      </Modal>
    </>
  );
};

export default AddServiceConnectionModal;
