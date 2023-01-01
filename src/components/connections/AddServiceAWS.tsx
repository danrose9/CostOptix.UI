import React from 'react';
import { Divider, Input, Segment, Dropdown, Form } from 'semantic-ui-react';

const steps = [
  {
    value: 'Default',
    steps: {
      1: 'Select <i>Billing Scopes</i>',
      2: 'Navigate to <b>App registrations</b>',
      3: 'Select <b>New registration</b>',
      4: 'Choose a name for this application',
    },
  },
];

export const AddServiceAWS = () => {
  return (
    <Segment>
      <Form>
        <Form.Field>
          1. Log into your
          <i>AWS</i> account. <a href="https://aws.amazon.com">https://aws.amazon.com</a>
        </Form.Field>
      </Form>
    </Segment>
  );
};

export default AddServiceAWS;
