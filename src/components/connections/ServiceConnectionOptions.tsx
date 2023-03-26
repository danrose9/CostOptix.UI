import React from 'react';
import { ConnectedBillingAccountType } from 'billingaccount-types';
import { ManageServiceConnection, DisableServiceConnection, RemoveServiceConnection } from './options/index';

interface IProps {
  billingAccounts: ConnectedBillingAccountType;
}

export const ServiceConnectionOptions = ({ ...billingAccounts }: IProps) => {
  const { id, providerId, status, accountName, provider, createdDate, currency } = billingAccounts.billingAccounts;

  var accountEnabled;
  if (status === 'Disabled') {
    accountEnabled = false;
  } else {
    accountEnabled = true;
  }

  return (
    <>
      <ManageServiceConnection
        accountName={accountName}
        provider={provider}
        id={id}
        status={status}
        createdDate={createdDate}
        currency={currency}
      />
      {/* <SyncServiceConnection /> */}
      {status === 'Transient' ? null : (
        <>
          <DisableServiceConnection providerId={providerId} id={id} accountStatus={accountEnabled as boolean} />
          <RemoveServiceConnection providerId={providerId} id={id} />{' '}
        </>
      )}
    </>
  );
};

export default ServiceConnectionOptions;
