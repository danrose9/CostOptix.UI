import React, { useState, useEffect } from 'react';
import { Form, Segment, Input } from 'semantic-ui-react';
import {
  AzureCustomerAgreement,
  AzureOnlineServices,
  AzureEnterpriseAgreement,
  AzurePartnerAgreement,
} from '../../forms';

type AzureFormDataType = {
  applicationId?: string;
  secretValue?: string;
  directoryId?: string;
};

const options = [
  { key: 'Microsoft Online Services Program', text: 'Microsoft Online Services Program', value: 'online' },
  { key: "Microsoft Customer Agreement'", text: 'Microsoft Customer Agreement', value: 'customer' },
  { key: 'Enterprise Agreement', text: 'Enterprise Agreement', value: 'enterprise' },
  { key: 'Microsoft Partner Agreement', text: 'Microsoft Partner Agreement', value: 'partner' },
];

const isFormValid = (formData: AzureFormDataType) => {
  const fd = { ...formData };

  if (fd.applicationId && fd.secretValue && fd.directoryId) {
    return true;
  } else {
    return false;
  }
};

export const AddServiceAzure = ({ DisableButtonOnInvalidForm, updateFormData }: any) => {
  const [formData, setFormData] = useState<AzureFormDataType | undefined>(undefined);

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    DisableButtonOnInvalidForm(isFormValid(formData as AzureFormDataType));
    updateFormData(formData);
  });

  const RenderForm = (billingType: string | undefined) => {
    switch (billingType) {
      case 'online':
        return <AzureOnlineServices />;
      case 'customer':
        return <AzureCustomerAgreement />;
      case 'enterprise':
        return <AzureEnterpriseAgreement />;
      case 'partner':
        return <AzurePartnerAgreement />;
      default:
        return null;
    }
  };

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
              <Input placeholder="Application ID" required name="applicationId" onChange={handleChange} />
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
              <Input placeholder="Secret Value" required name="secretValue" onChange={handleChange} />
            </Form.Field>
          </Form.Group>
          <Form.Field>
            11. Select <i>API Permissions</i> from the left nav
          </Form.Field>
          <Form.Field>
            12. Click <i>Add a permission</i>
          </Form.Field>
          <Form.Field>
            13. Under <i>Microsoft APIs </i> select <i>Azure Service Management</i>
          </Form.Field>
          <Form.Field>
            14. Check <i>user_impersonation</i> and the <i>Add permission</i>
          </Form.Field>
          <Form.Group>
            <Form.Field>
              15. From the new registered App, copy the <i>Directory (tenant) ID</i> value into the box below.
              <Input placeholder="Directory ID" required name="directoryId" onChange={handleChange} />
            </Form.Field>
          </Form.Group>
          <Form.Field inline></Form.Field>
          <AzureCustomerAgreement />
        </Form>
      </Segment>
    </>
  );
};

export default AddServiceAzure;
