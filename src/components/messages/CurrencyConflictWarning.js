import React from 'react';
import { Message } from 'semantic-ui-react';

export const CurrencyConflictWarning = (props) => {
  return (
    <>
      <Message
        warning
        header="A currency conflict has been found"
        content="The Billing Accounts returned do not share a common currency, these will be converted using your preferred currency"
        onDismiss={props.handleDismiss}
      />
    </>
  );
};

export default CurrencyConflictWarning;
