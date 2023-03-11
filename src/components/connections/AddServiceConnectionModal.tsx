import React, { useState, useContext, useEffect, FormEvent, Fragment, FC } from 'react';
import { useDispatch } from 'react-redux';
import { Header, Modal, Table, Checkbox, Button, Icon, CheckboxProps } from 'semantic-ui-react';
import { StyledContent } from '../../styles/StyledServiceConnections';
import { AddServiceAzure, AddServiceAWS } from './index';
import { ProviderImage } from '../ProviderImage';
import styled from 'styled-components';
import StandardButton from '../buttons/StandardButton';
import { isValid } from '../../utils/formValidation';
import { DemoContext } from '../../app/DemoContext';
import fetchCloudBillingAccounts from '../../services/api/fetchCloudBillingAccounts';
import { ServiceConnectionWarning } from '../messages';
import { getIndex } from '../../utils/arrayHelper';
import { CloudBillingAccountType, AddBillingAccountType } from 'cloud-billingaccounts-types';
import { ErrorType } from 'error-types';
import { IProviderProps } from 'provider-types';
import { addBillingAccount } from '../../services/redux/thunks/serviceProvidersThunk';
import { AppDispatch } from '../../services/redux/store';

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

type AzureFormDataType = {
  applicationId: string;
  secretValue: string;
  directoryId: string;
};

const AddServiceConnectionModal: FC<IProviderProps> = ({ cloudProvider }) => {
  const dispatch = useDispatch<AppDispatch>();
  const isDemo = useContext(DemoContext);

  const { provider, vendor, name } = cloudProvider;

  const [open, setOpen] = useState<boolean>(false);
  const [secondOpen, setSecondOpen] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const [billingAccounts, setBillingAccount] = useState<CloudBillingAccountType[]>([]);

  const [error, setError] = useState<ErrorType>({
    isError: false,
    errorMessage: '',
  });

  const [providerData, setProviderData] = useState<AddBillingAccountType>({
    providerAccountId: '',
    providerName: '',
    cloudProvider: '',
    username: '',
    password: '',
    billingAccounts: [],
  });

  const [formData, setFormData] = useState<AzureFormDataType>({
    applicationId: '',
    secretValue: '',
    directoryId: '',
  });

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // process form and return billingaccounts
  const handleOnSubmit = async () => {
    setIsFetching(true);
    const args = {
      ...formData,
      provider: provider,
    };

    const accounts = await fetchCloudBillingAccounts(args);

    if (accounts.error) {
      setError({ isError: true, errorMessage: accounts.error });
    } else {
      // update state with formdata
      setProviderData({
        providerAccountId: '',
        providerName: '',
        cloudProvider: args.provider,
        username: args.applicationId,
        password: args.secretValue,
        billingAccounts: accounts.billingAccounts,
      });

      // reset error state
      setError({ isError: false, errorMessage: '' });

      // update state with all billing accounts returned
      setBillingAccount(accounts.billingAccounts);

      // open second modal
      setSecondOpen(true);
    }
    setIsFetching(false);
  };

  // handle when initial modeal should open
  const handleOpenInitialModal = () => {
    // clear error state
    setError({ isError: false, errorMessage: '' });

    console.log(provider);

    // disabled continue button
    setIsButtonDisabled(true);
  };

  // handle when each billing accunt is selected
  const handleSelection = (e: FormEvent<HTMLInputElement>, data: CheckboxProps) => {
    let newState = [...providerData.billingAccounts];

    // find billingAccount in checked accounts
    var indexOfChecked = getIndex(newState as [], 'billingAccountName', data.id as string);

    // if it doesn't exist, copy from billingAccount array
    if (indexOfChecked === -1) {
      var index = getIndex(billingAccounts as [], 'billingAccountName', data.id as string);

      newState.push(billingAccounts[index]);
    } else {
      newState.splice(indexOfChecked, 1);
    }

    // probably have to update this to use setProviderData instead
    setProviderData({
      ...providerData,
      billingAccounts: newState,
    });
  };

  // logic when each element is selected
  const handleIsChecked = (billingAccountName: string) => {
    var index = getIndex(providerData.billingAccounts as [], 'billingAccountName', billingAccountName);

    if (index === -1) {
      return false;
    } else return true;
  };

  // close second modal
  const handleCancelButton = () => {
    setSecondOpen(false);
    setProviderData({
      ...providerData,
      billingAccounts: [],
    });
  };

  // logic when choosing select/deselect all
  const handleSelectAll = (e: FormEvent<HTMLInputElement>, data: CheckboxProps) => {
    if (data.checked) {
      setProviderData({
        ...providerData,
        billingAccounts: billingAccounts,
      });
    } else {
      setProviderData({ ...providerData, billingAccounts: [] });
    }
  };

  // send api request for adding billing accounts
  const handleAddBillingAccounts = async () => {
    console.log(providerData);

    // dispatch(addBillingAccount(args));
  };

  // for each provider supply a new component exposing configuration steps
  const ProviderSteps = () => {
    switch (provider as string) {
      case 'Azure':
        return <AddServiceAzure handleChange={handleChange} />;

      case 'AWS':
        return <AddServiceAWS handleChange={handleChange} />;

      default:
        return null;
    }
  };

  useEffect(() => {
    setIsButtonDisabled(isValid(formData));
  }, [formData]);

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
          <p style={{ fontSize: '1.2em', paddingLeft: '1.5em' }} data-testid="sc-provider-header">
            Add a new {provider} Service Connection
          </p>
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
          <div style={{ display: 'inline-flex' }}>
            {error.isError ? <ServiceConnectionWarning content={error.errorMessage} /> : null}
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

      <Modal onClose={() => setSecondOpen(false)} open={secondOpen} size="small" data-testid={'second-modal'}>
        <Header icon>Billing Accounts</Header>
        <Modal.Content>
          <p>
            We've found some billing accounts associated with your Azure organization. Select the accounts you would
            like to add to CostOptix.
          </p>
        </Modal.Content>
        <Modal.Content>
          <Table celled>
            <Table.Header fullWidth>
              <Table.Row>
                <Table.HeaderCell width={2}>
                  <Checkbox onChange={handleSelectAll} toggle defaultChecked={true} />
                </Table.HeaderCell>
                <Table.HeaderCell width={4}>Account Name</Table.HeaderCell>
                <Table.HeaderCell width={8}>Account Id</Table.HeaderCell>
                <Table.HeaderCell width={2}>Currency</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <>
                {billingAccounts.map((account: CloudBillingAccountType, index) => {
                  return (
                    <Table.Row key={index}>
                      <Table.Cell>
                        <Checkbox
                          toggle
                          onChange={handleSelection}
                          id={account.billingAccountName}
                          value={account.billingAccountName}
                          checked={handleIsChecked(account.billingAccountName)}
                        />
                      </Table.Cell>
                      <Table.Cell>{account.billingAccountName}</Table.Cell>
                      <Table.Cell>{account.billingAccountId}</Table.Cell>
                      <Table.Cell>{account.currency}</Table.Cell>
                    </Table.Row>
                  );
                })}
              </>
            </Table.Body>
          </Table>
        </Modal.Content>

        <Modal.Actions>
          <Button floated="right" icon labelPosition="left" primary size="small" onClick={handleAddBillingAccounts}>
            <Icon name="id card outline" /> Add Accounts
          </Button>
          <Button size="small" onClick={handleCancelButton}>
            Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default AddServiceConnectionModal;
