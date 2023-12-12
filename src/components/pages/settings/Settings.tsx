import React from 'react';
import { PageContainer } from '../../__styles__/DefaultPageStyles';
import { Tab } from 'semantic-ui-react';

import { Account } from './index';

const panes = [{ menuItem: 'Account', render: () => <Account /> }];

interface ISettingsProps {
  activeTab?: number;
}

const Settings: React.FC<ISettingsProps> = ({ activeTab }) => {
  return (
    <PageContainer>
      <Tab menu={{ fluid: true, vertical: true }} menuPosition="left" panes={panes} defaultActiveIndex={activeTab} />
    </PageContainer>
  );
};

export default Settings;
