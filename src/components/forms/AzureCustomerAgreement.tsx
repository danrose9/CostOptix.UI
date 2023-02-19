import React from 'react';
import { Form } from 'semantic-ui-react';

export const AzureCustomerAgreement = () => {
  return (
    <>
      <Form.Field>
        12. Navigate to <i>Cost Management + Billing</i>.
      </Form.Field>
      <Form.Field>
        13. Select <i>Billing scopes</i> from the left hand Nav, select the <i>billing account</i> you would like to
        report on.
      </Form.Field>
      <Form.Field>
        14. Select <i>Access control (IAM)</i> from the left hand Nav
      </Form.Field>
      <Form.Field>
        15. Select <i>Add</i>
      </Form.Field>
      <Form.Field>
        16. Select <i>Billing account reader</i>. Select the App you created earlier and click <b>Add</b>
      </Form.Field>
    </>
  );
};

export default AzureCustomerAgreement;
