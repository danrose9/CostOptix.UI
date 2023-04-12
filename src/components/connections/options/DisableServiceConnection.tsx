import React, { useState, useContext } from 'react';
import { useAppDispatch } from '../../../services/redux/store';
import { Dropdown } from 'semantic-ui-react';
import { disableBillingAccount, enableBillingAccount } from '../../../services/redux/thunks/serviceProvidersThunk';
import { PollingContext } from '../ServiceConnection';

export const DisableServiceConnection = (props: { providerId: string; id: string; accountStatus: boolean }) => {
  const [enabled, setEnabled] = useState(props.accountStatus);
  const dispatch = useAppDispatch();
  const setIsPolling = useContext(PollingContext);

  const handleOnClick = () => {
    setIsPolling(true);
    const args = {
      id: props.id,
      providerId: props.providerId,
    };

    setEnabled(!enabled);
    if (enabled) {
      dispatch(disableBillingAccount(args));
    } else {
      dispatch(enableBillingAccount(args));
    }
  };

  return (
    <>
      {enabled ? (
        <Dropdown.Item icon="bell slash outline" text="Disable" onClick={handleOnClick} />
      ) : (
        <Dropdown.Item icon="bell outline" text="Enable" onClick={handleOnClick} />
      )}
    </>
  );
};

export default DisableServiceConnection;
