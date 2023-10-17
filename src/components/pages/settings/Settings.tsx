import React from 'react';
import { PageContent } from '../../__styles__/DefaultPageStyles';
import { Tab } from 'semantic-ui-react';

import { Profile } from './index';

const panes = [{ menuItem: 'Profile', render: () => <Profile /> }];

interface ISettingsProps {
  activeTab?: number;
}

const Settings: React.FC<ISettingsProps> = ({ activeTab }) => {
  return (
    <PageContent>
      <Tab menu={{ fluid: true, vertical: true }} menuPosition="left" panes={panes} defaultActiveIndex={activeTab} />
    </PageContent>
  );
};

export default Settings;
