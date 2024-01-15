import React from 'react';
import PageWrapper from '../PageWrapper';
import { Tab } from 'semantic-ui-react';

import { Account } from './index';

const panes = [{ menuItem: 'Account', render: () => <Account /> }];

interface ISettingsProps {
  activeTab?: number;
}

const Settings: React.FC<ISettingsProps> = ({ activeTab }) => {
  return (
    <PageWrapper>
      <Tab menu={{ fluid: true, vertical: true }} menuPosition="left" panes={panes} defaultActiveIndex={activeTab} />
    </PageWrapper>
  );
};

export default Settings;
