import React from 'react';
import { PageContent } from '../__styles__/DefaultPageStyles';
import { Tab } from 'semantic-ui-react';
import ApplicationSettings from './ApplicationSettings';
import ChangeLog from './ChangeLog';
import { Profile } from './Profile';

const panes = [
  { menuItem: 'Profile', render: () => <Profile /> },
  { menuItem: 'Application', render: () => <ApplicationSettings /> },
  // { menuItem: 'Security', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
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
