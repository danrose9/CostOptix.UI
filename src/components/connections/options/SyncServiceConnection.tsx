import React, { useState } from 'react';
import { Dropdown, Icon } from 'semantic-ui-react';

export const SyncServiceConnection = () => {
  const [loading, setLoading] = useState(false);
  return (
    <Dropdown.Item
      onClick={() => {
        setLoading(!loading);
      }}
    >
      <Icon name="sync" loading={loading} />
      Sync
    </Dropdown.Item>
  );
};

export default SyncServiceConnection;
