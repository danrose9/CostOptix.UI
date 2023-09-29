import React, { useState, useEffect } from 'react';
import { Form, Segment, Input } from 'semantic-ui-react';
import { AzureCustomerAgreement } from '../../forms';
import { AzureFormDataType } from 'provider-types';

const isFormValid = (formData: AzureFormDataType) => {
  const fd = { ...formData };

  if (fd.applicationId && fd.secretValue && fd.directoryId) {
    return true;
  } else {
    return false;
  }
};

interface IProviderFormProps {
  DisableButtonOnInvalidForm: any;
  updateFormData: any;
}

export const AddServiceAzure: React.FC<IProviderFormProps> = ({ DisableButtonOnInvalidForm, updateFormData }) => {
  const [formData, setFormData] = useState<AzureFormDataType | undefined>(undefined);

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    DisableButtonOnInvalidForm(isFormValid(formData as AzureFormDataType));
    updateFormData(formData);
  });

  return (
    <>
      <Segment>
        <Form>
          <Form.Field data-testid={'provider-steps-1'}>
            1. Log into your <i>Azure</i> account. <a href="https://portal.azure.com/">https://portal.azure.com/</a>
          </Form.Field>
          <Form.Field>
            2. Navigate to <b>App registrations</b>
          </Form.Field>
          <Form.Field>
            3. Select <i>New registration</i> and choose a name for this application
          </Form.Field>
          <Form.Field>
            4. Set <i>Supported account types</i> to{' '}
            <i>Accounts in this organizational directory only (TenantName only - Single tenant)</i>
          </Form.Field>
          <Form.Field>
            5. Select <i>Register</i>
          </Form.Field>
          <Form.Group>
            <Form.Field>
              6. Once the new application has been created, enter the <i>Application (Client) ID</i> here.{' '}
              <Input
                placeholder="Application ID"
                required
                name="applicationId"
                onChange={handleChange}
                aria-label="applicationId"
              />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Field>
              7. Also copy the <i>Directory (tenant) ID</i> value into the box below.
              <Input
                placeholder="Directory ID"
                required
                name="directoryId"
                onChange={handleChange}
                aria-label="directoryId"
              />
            </Form.Field>
          </Form.Group>
          <Form.Field>
            8. Select <i>Manage, Certificates & Secrets</i>
          </Form.Field>
          <Form.Field>
            9. Click <i>New client secret</i>
          </Form.Field>
          <Form.Field>
            10. Enter a Description for the client secret, an expiry period then click <i>Add</i>
          </Form.Field>
          <Form.Group>
            <Form.Field>
              11. Copy the <i>Value</i> into the box below.
              <Input
                type="password"
                placeholder="Secret Value"
                required
                name="secretValue"
                onChange={handleChange}
                aria-label="secretValue"
              />
            </Form.Field>
          </Form.Group>
          <Form.Field>
            12. Select <i>API Permissions</i> from the left nav
          </Form.Field>
          <Form.Field>
            13. Click <i>Add a permission</i>
          </Form.Field>
          <Form.Field>
            14. Under <i>Microsoft APIs </i> select <i>Azure Service Management</i>
          </Form.Field>
          <Form.Field>
            15. Check <i>user_impersonation</i> and the <i>Add permission</i>
          </Form.Field>

          <Form.Field inline></Form.Field>
          <AzureCustomerAgreement />
        </Form>
      </Segment>
    </>
  );
};

export default AddServiceAzure;
