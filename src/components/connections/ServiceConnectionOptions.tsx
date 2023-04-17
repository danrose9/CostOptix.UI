import React from 'react';
import { ManageServiceConnection, DisableServiceConnection, RemoveServiceConnection } from './options/index';
import { IBillingAccountProps } from '../../types';

export const ServiceConnectionOptions = ({ billingAccount }: IBillingAccountProps) => {
  const { id, providerId, status } = billingAccount;

  var accountEnabled;
  if (status === 'Disabled') {
    accountEnabled = false;
  } else {
    accountEnabled = true;
  }

  return (
    <>
      <ManageServiceConnection billingAccount={billingAccount} />
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
