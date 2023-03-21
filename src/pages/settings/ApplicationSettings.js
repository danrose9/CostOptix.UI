import React from 'react';
import { Tab, Label, Divider } from 'semantic-ui-react';
import { SectionTitle, SectionHeader } from '../__styles__/settings.styles';

const { version } = require('../../../package.json');

export const ApplicationSettings = () => {
  return (
    <>
      <Tab.Pane color="blue">
        <SectionHeader>
          <SectionTitle>Application</SectionTitle>

          <Label size="large" color="teal">
            Application Version: {version}
          </Label>
        </SectionHeader>
        <Divider />
      </Tab.Pane>
    </>
  );
};

export default ApplicationSettings;
