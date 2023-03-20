import React from 'react';
import { PageContent } from '../__styles__/DefaultPageStyles';
import { Tab } from 'semantic-ui-react';

import { ApplicationSettings, ChangeLog, Profile, Users } from './index';

const panes = [
  { menuItem: 'Profile', render: () => <Profile /> },
  { menuItem: 'Application', render: () => <ApplicationSettings /> },
  { menuItem: 'Users', render: () => <Users /> },
  { menuItem: 'Change Log', render: () => <ChangeLog /> },
];

const Settings = (props) => {
  return (
    <PageContent>
      <Tab
        menu={{ fluid: true, vertical: true }}
        menuPosition="left"
        panes={panes}
        defaultActiveIndex={props.activeTab}
      />
    </PageContent>
  );
};

export default Settings;
