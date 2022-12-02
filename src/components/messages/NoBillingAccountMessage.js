import React from 'react';
import { Message } from 'semantic-ui-react';

export const NoBillingAccountMessage = (props) => {
  return (
    <>
      <Message
        header="No Billing Accounts were found"
        content="We were unable to find any Billing Accounts. Please check account access through your provider"
        onDismiss={props.handleDismiss}
      />
    </>
  );
};

export default NoBillingAccountMessage;
