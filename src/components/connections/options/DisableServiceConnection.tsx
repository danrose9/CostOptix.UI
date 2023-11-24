import React, { useState, useContext } from 'react';
import { useAppDispatch } from '../../../services/redux/store';
import { Dropdown } from 'semantic-ui-react';
import { disableBillingAccount, enableBillingAccount } from '../../../services/redux/thunks/serviceProvidersThunk';
import { PollingContext } from '../ServiceConnection';

interface IDisableServiceConnectionProps {
  providerId: string;
  id: string;
  accountStatus: boolean;
  isDemo?: boolean;
}

export const DisableServiceConnection: React.FC<IDisableServiceConnectionProps> = ({
  providerId,
  id,
  accountStatus,
  isDemo,
}) => {
  const [enabled, setEnabled] = useState(accountStatus);
  const dispatch = useAppDispatch();
  const setIsPolling = useContext(PollingContext);

  const handleOnClick = () => {
    setIsPolling(true);
    const args = {
      id: id,
      providerId: providerId,
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
        <Dropdown.Item
          icon="bell slash outline"
          text="Disable"
          onClick={handleOnClick}
          data-testid="sc-dropdown-disable"
          disabled={isDemo}
        />
      ) : (
        <Dropdown.Item
          icon="bell outline"
          text="Enable"
          onClick={handleOnClick}
          data-testid="sc-dropdown-enable"
          disabled={isDemo}
        />
      )}
    </>
  );
};

export default DisableServiceConnection;
