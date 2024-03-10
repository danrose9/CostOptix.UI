import React from 'react';
import { Form } from 'semantic-ui-react';

export const AzureCustomerAgreement = () => {
  return (
    <>
      <Form.Field>
        Some customer may have a Microsoft Customer Agreement tenant type, if you do, then we'll just need to complete a
        few more steps. <br /> <br />
        If you are unsure you can check by navigating to
        <a href="https://portal.azure.com/#view/Microsoft_Azure_GTM/ModernBillingMenuBlade/~/AllBillingScopes">
          {' '}
          Cost Management.
        </a>{' '}
        <br /> <br />
        Each of your billing scopes will show a <i>Billing account type</i>. If the billing account you would like to
        report on is a <i>Microsoft Customer Agreement</i> type then continue with the rest of these steps.
      </Form.Field>
      <Form.Field>
        19. Select <i>Billing scopes</i> from the left hand Nav, select the <i>billing account</i> you would like to
        report on.
      </Form.Field>
      <Form.Field>
        20. Select <i>Access control (IAM)</i> from the left hand Nav
      </Form.Field>
      <Form.Field>
        21. Select <i>Add</i>
      </Form.Field>
      <Form.Field>
        22. Select <i>Billing account reader</i>. Select the App you created earlier and click <b>Add</b>
      </Form.Field>
    </>
  );
};

export default AzureCustomerAgreement;
