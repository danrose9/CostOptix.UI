import React from 'react';
import { Segment, Form, Icon, Container } from 'semantic-ui-react';
import styled from 'styled-components';
import CodeText from '../../CodeText';

const AWSPolicy = `{
  "Version": "2012-10-17",
  "Statement": [
      {
          "Sid": "VisualEditor0",
          "Effect": "Allow",
          "Action": [
              "ce:GetCostAndUsageWithResources",
              "ce:GetCostAndUsage",
              "ce:GetCostForecast"
          ],
          "Resource": "*"
      }
  ]
}`;

export const AddServiceAWS = ({ handleChange }: any) => {
  return (
    <Segment>
      <Form>
        <Form.Field>
          1. Log into your
          <i>AWS</i> account. <a href="https://aws.amazon.com">https://aws.amazon.com</a>
        </Form.Field>
        <Form.Field>
          2. Navigate to <i>AWS Cost Explorer</i>
        </Form.Field>
        <Form.Field>
          3. Select <i>Preferences</i>
        </Form.Field>
        <Form.Field>
          4. Select <i>Hourly and Resource Level Data</i>
          <br /> <br />
          <strong>Note:</strong> By selecting this option you will incur a cost for utilising the Cost Explorer. For
          more information refer to the AWS website,{' '}
          <a href="https://aws.amazon.com/about-aws/whats-new/2019/11/aws-cost-explorer-supports-hourly-resource-level-granularity/">
            Cost Explorer
          </a>
        </Form.Field>
        <Form.Field>
          5. Create an <i>IAM Policy</i>. Navigate to <i>IAM</i>
        </Form.Field>
        <Form.Field>
          6. Select <i>Policies</i> from the left-hand navigation bar and click <i>Create Policy</i>
        </Form.Field>
        <Form.Field>
          7. Select the <i>JSON</i> tab and copy/paste the below policy into the editor
        </Form.Field>
        <Form.Field>
          <CodeText children={AWSPolicy} />
        </Form.Field>
        <Form.Field>
          8. Click Next twice and when on the <i>Review Policy</i> page add a Name & Description then click{' '}
          <i>Create Policy</i>
        </Form.Field>
        <Form.Field>
          9. Create an <i>IAM User</i>. Select <i>Users</i> in the left hand navigation bar
        </Form.Field>
        <Form.Field>
          10. Click the <i>Add User</i> button and give the user account a name. Click Next.
        </Form.Field>
        <Form.Field>
          11. Select <i>Attach exiting policies directly</i>
        </Form.Field>
        <Form.Field>12. Select the policy that you created in step 8. Click Next</Form.Field>
        <Form.Field>13. Click Create User</Form.Field>
        <Form.Field>
          14. Once the new user has been created. Choose the user and navigate to the <i>Service credentials</i> tab
        </Form.Field>
        <Form.Field>
          15. Create an access key and select <i>Third-party service</i>
        </Form.Field>
        <Form.Field>16. Click the confirmation box an choose Next</Form.Field>
        <Form.Field>
          17. Add a description and click <i>Create access key</i>
        </Form.Field>
        <Form.Field>
          18. Copy the <i>Access key</i> and <i>Secret access key</i> into the boxes below and click Done
        </Form.Field>
        <Form.Group widths="equal">
          <Form.Input placeholder="Access key" required name="applicationId" onChange={handleChange} />
          <Form.Input placeholder="Secret value" required name="secretValue" onChange={handleChange} />
        </Form.Group>
        <Form.Field>
          19. Once completed click the <b>Continue</b> button below
        </Form.Field>
      </Form>
    </Segment>
  );
};

export default AddServiceAWS;
