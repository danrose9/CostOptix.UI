import React from 'react';
import { Segment, Form } from 'semantic-ui-react';

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
