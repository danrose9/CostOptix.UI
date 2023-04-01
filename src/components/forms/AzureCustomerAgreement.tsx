import React from 'react';
import { Form } from 'semantic-ui-react';

export const AzureCustomerAgreement = () => {
  return (
    <>
      <Form.Field>
        16. Navigate to <b>Subscriptions</b>
      </Form.Field>
      <Form.Field>17. For each subscription that you would like to report on complete steps 18-21</Form.Field>
      <Form.Field>
        <Form.Field>18. Select a subscription</Form.Field>
        19. Select <i>Role Assignments</i> and then <i>Add</i> followed by <i>Add role assignment</i>
      </Form.Field>
      <Form.Field>
        20. Choose <i>Reader</i> and add the app you created earlier as a <i>member</i>
      </Form.Field>
      <Form.Field>
        21. Once completed click <i>Review + Assign</i>
      </Form.Field>
      <Form.Field>
        22. Navigate to <b>Cost Management + Billing</b>.
      </Form.Field>
      <Form.Field>
        23. Select <i>Billing scopes</i> from the left hand Nav, select the <i>billing account</i> you would like to
        report on.
      </Form.Field>
      <Form.Field>
        24. Select <i>Access control (IAM)</i> from the left hand Nav
      </Form.Field>
      <Form.Field>
        25. Select <i>Add</i>
      </Form.Field>
      <Form.Field>
        26. Select <i>Billing account reader</i>. Select the App you created earlier and click <b>Add</b>
      </Form.Field>
    </>
  );
};

export default AzureCustomerAgreement;
