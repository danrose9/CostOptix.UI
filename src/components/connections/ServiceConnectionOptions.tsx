import React from 'react';
import { ManageServiceConnection, DisableServiceConnection, RemoveServiceConnection } from './options/index';
import { IBillingAccountProps } from '../../types';
import { useIsDemo } from '../hoc/withDemo';

export const ServiceConnectionOptions = ({ billingAccount }: IBillingAccountProps) => {
  const { id, providerId, status } = billingAccount;
  const isDemo = useIsDemo();
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
          <DisableServiceConnection
            providerId={providerId}
            id={id}
            accountStatus={accountEnabled as boolean}
            isDemo={isDemo}
          />
          <RemoveServiceConnection providerId={providerId} id={id} isDemo={isDemo} />
        </>
      )}
    </>
  );
};

export default ServiceConnectionOptions;
