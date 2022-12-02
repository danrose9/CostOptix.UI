import React from 'react';
import { Tab, Label } from 'semantic-ui-react';

export const ApplicationSettings = () => {
  const appVersion = sessionStorage.getItem('application version');
  return (
    <>
      <Tab.Pane>
        <Label size="large" color="teal">
          Application Version: {appVersion}
        </Label>
      </Tab.Pane>
    </>
  );
};

export default ApplicationSettings;
