import React from 'react';
import { Tab, Label } from 'semantic-ui-react';

const { version } = require('../../../package.json');

export const ApplicationSettings = () => {
  return (
    <>
      <Tab.Pane>
        <Label size="large" color="teal">
          Application Version: {version}
        </Label>
      </Tab.Pane>
    </>
  );
};

export default ApplicationSettings;
