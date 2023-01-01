import React from 'react';
import { Form, Segment, Input } from 'semantic-ui-react';

export const AzureDefaultForm = ({ children }: any) => {
  return (
    <Segment>
      <Form>
        <Form.Field>
          1. Log into your
          <i>Azure</i> account. <a href="https://portal.azure.com">https://portal.azure.com</a>
        </Form.Field>
        <Form.Field>
          2. Navigate to <i>App registrations</i>
        </Form.Field>
        <Form.Field>
          3. Select <i>New registration</i> and choose a name for this application
        </Form.Field>
        <Form.Field>
          4. Set <i>Supported account types</i> to{' '}
          <b>Accounts in this organizational directory only (TenantName only - Single tenant)</b>
        </Form.Field>
        <Form.Field>
          5. Select <i>Register</i>
        </Form.Field>
        <Form.Group>
          <Form.Field>
            6. Once the new application has been created, enter the <i>Application (Client) ID</i> here.{' '}
            <Input focus placeholder="Application ID" />
          </Form.Field>
        </Form.Group>
        <Form.Field>
          7. Select <i>Manage, Certificates & Secrets</i>
        </Form.Field>
        <Form.Field>
          8. Click <i>New client secret</i>
        </Form.Field>
        <Form.Field>
          9. Enter a Description for the client secret, an expiry period then click <i>Add</i>
        </Form.Field>
        <Form.Group>
          <Form.Field>
            10. Copy the <i>Value</i> into the box below.
            <Input focus placeholder="Secret Value" />
          </Form.Field>
        </Form.Group>

        <Form.Field inline></Form.Field>
        {children}
      </Form>
    </Segment>
  );
};

export default AzureDefaultForm;
