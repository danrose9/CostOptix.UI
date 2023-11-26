import React from 'react';
import { Message } from 'semantic-ui-react';

export const NoBillingAccountMessage = (props) => {
  return (
    <>
      <Message
        header="No Billing Accounts were found"
        content="We were unable to find any Billing Accounts. Check that you have set up a service connection to your cloud provider."
        onDismiss={props.handleDismiss}
      />
    </>
  );
};

export default NoBillingAccountMessage;
