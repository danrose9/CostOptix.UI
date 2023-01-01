import React, { useState } from 'react';
import { Input, Segment, Dropdown, Form, Button } from 'semantic-ui-react';
import { StyledContent } from '../../styles/StyledServiceConnections';
import {
  AzureDefaultForm,
  AzureCustomerAgreement,
  AzureOnlineServices,
  AzureEnterpriseAgreement,
  AzurePartnerAgreement,
} from '../forms';

const options = [
  { key: 'Microsoft Online Services Program', text: 'Microsoft Online Services Program', value: 'online' },
  { key: "Microsoft Customer Agreement'", text: 'Microsoft Customer Agreement', value: 'customer' },
  { key: 'Enterprise Agreement', text: 'Enterprise Agreement', value: 'enterprise' },
  { key: 'Microsoft Partner Agreement', text: 'Microsoft Partner Agreement', value: 'partner' },
];

export const AddServiceAzure = () => {
  const [value, setValue] = useState();
  const [showForm, setShowForm] = useState(false);

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

  const handleOnChange = (event: any, data: any) => {
    setValue(data.value);
    setShowForm(true);
  };

  return (
    <>
      <StyledContent>
        Select the Azure <i>Billing account type</i> for your tenant
      </StyledContent>

      <Dropdown
        placeholder="Billing Account Type"
        fluid
        selection
        options={options}
        onChange={handleOnChange}
        value={value}
      />
      {showForm ? <AzureDefaultForm children={RenderForm(value)} /> : null}
    </>
  );
};

export default AddServiceAzure;
