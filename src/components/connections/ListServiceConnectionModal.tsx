import React, { useState, FormEvent, useContext } from 'react';
import { useAppDispatch } from '../../services/redux/store';
import { Modal, Table, Checkbox, Button, Icon, CheckboxProps } from 'semantic-ui-react';
import StandardButton from '../buttons/StandardButton';
import { ModalHeader } from '../__styles__/StyledModal';
import { ProviderImage } from '../ProviderImage';
import fetchCloudBillingAccounts from '../../services/api/fetchCloudBillingAccounts';
import { addBillingAccount } from '../../services/redux/thunks/serviceProviderThunk';
import { getIndex } from '../../utils/arrayHelper';
import {
  AddProviderType,
  CloudProviderType,
  AddBillingAccountType,
  ICloudBillingAccountsArgs,
} from 'cloud-billingaccounts-types';
import { ServiceConnectionHeader, ServiceConnectionModalActions } from './__styles__/StyledServiceConnections';
import { ServiceConnectionProviderType } from 'provider-types';
import { AzureFormDataType, AWSFormDataType } from 'provider-types';
import { resetIsBillingAccountsAvailable } from '../../services/redux/reducers/serviceProviderSlice';

import { PollingContext } from './ServiceConnection';

interface IModalProps {
  disabled: boolean;
  cloudProvider: ServiceConnectionProviderType;
  formData: AzureFormDataType | AWSFormDataType;
  updateSetError: any;
  closeFormModal: any;
}

const ListServiceConnectionModal: React.FC<IModalProps> = ({
  disabled,
  cloudProvider,
  formData,
  updateSetError,
  closeFormModal,
}) => {
  const { provider } = cloudProvider;
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [numberOfBillingAccountsReturned, setNumberOfBillingAccountsReturned] = useState<number>(0);
  const [billingAccounts, setBillingAccount] = useState<AddBillingAccountType[]>([]);
  const [secondOpen, setSecondOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const setIsPolling = useContext(PollingContext);

  const [providerData, setProviderData] = useState<AddProviderType>({
    providerAccountId: '',
    providerName: '',
    cloudProvider: '',
    username: '',
    password: '',
    billingAccounts: [],
  });

  // process form and return billingaccounts
  const handleOnSubmit = async () => {
    setIsFetching(true);
    const args = {
      ...formData,
      provider: provider,
    } as ICloudBillingAccountsArgs;

    const accounts: CloudProviderType = await fetchCloudBillingAccounts(args);

    // check if accounts already exist and disable for addition

    setNumberOfBillingAccountsReturned(accounts.count);

    if (accounts.error) {
      updateSetError({ isError: true, errorMessage: accounts.error });
    } else {
      // update state with formdata
      setProviderData({
        providerAccountId: accounts.providerAccountId,
        providerName: accounts.providerName,
        cloudProvider: args.provider,
        username: args.applicationId,
        password: args.secretValue,
        billingAccounts: accounts.billingAccounts,
      });

      // reset error state
      updateSetError({ isError: false, errorMessage: '' });

      // update state with all billing accounts returned
      setBillingAccount(accounts.billingAccounts);

      // open second modal
      setSecondOpen(true);
    }

    setIsFetching(false);
  };

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

  const checkifSelectAllIsChecked = () => {
    if (providerData.billingAccounts.length === numberOfBillingAccountsReturned) {
      return true;
    } else return false;
  };

  // send api request for adding billing accounts
  const handleAddBillingAccounts = async () => {
    setIsAdding(true);

    await dispatch(addBillingAccount(providerData));
    setIsAdding(false);

    // Return to service connection page

    setIsPolling(true);
    setSecondOpen(false);
    closeFormModal(false);
    dispatch(resetIsBillingAccountsAvailable);
  };

  const checkIfSubmitButtonIsDisabled = () => {
    if (providerData.billingAccounts.length === 0) {
      return true;
    } else return false;
  };

  return (
    <Modal
      open={secondOpen}
      size="small"
      trigger={
        <StandardButton
          disabled={disabled}
          positive={true}
          label="Continue"
          onClick={handleOnSubmit}
          loading={isFetching}
        />
      }
    >
      <ModalHeader>
        <ProviderImage provider={provider} size="small" floated="left" data-testid="sc-provider-image" />
        <ServiceConnectionHeader>Billing Accounts</ServiceConnectionHeader>
      </ModalHeader>
      <Modal.Content>
        <p>
          We've found some billing accounts associated with your Azure organization. Select the accounts you would like
          to add to CostOptix.
        </p>
      </Modal.Content>
      <Modal.Content scrolling>
        <Table celled size="small">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={2}>
                <Checkbox onChange={handleSelectAll} toggle checked={checkifSelectAllIsChecked()} />
              </Table.HeaderCell>
              <Table.HeaderCell width={6}>Account Name</Table.HeaderCell>
              <Table.HeaderCell width={7}>Account Id</Table.HeaderCell>
              <Table.HeaderCell width={1}>Currency</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <>
              {billingAccounts.map((account: AddBillingAccountType, index) => {
                // const result = existingBillingAccounts.find(
                //   ({ account }: any) => account.billingAccounId === existingBillingAccounts.accountId
                // );
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

      <ServiceConnectionModalActions>
        <Button
          floated="right"
          icon
          labelPosition="left"
          primary
          size="small"
          onClick={handleAddBillingAccounts}
          disabled={checkIfSubmitButtonIsDisabled()}
          loading={isAdding}
        >
          <Icon name="id card outline" /> Add Accounts
        </Button>
        <Button size="small" onClick={handleCancelButton}>
          Cancel
        </Button>
      </ServiceConnectionModalActions>
    </Modal>
  );
};

export default ListServiceConnectionModal;
