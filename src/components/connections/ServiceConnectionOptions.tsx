import React from 'react';
import { ManageServiceConnection, DisableServiceConnection, RemoveServiceConnection } from './options/index';
import { IBillingAccountProps } from '../../types';

export const ServiceConnectionOptions = ({ ...billingAccount }: IBillingAccountProps) => {
  const { id, providerId, status, accountName, provider, createdDate, currency } = billingAccount.billingAccount;

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
          <RemoveServiceConnection providerId={providerId} id={id} />
        </>
      )}
    </>
  );
};

export default ServiceConnectionOptions;
